import { Component } from '@angular/core';
import { App, NavController, LoadingController, PopoverController, AlertController, Tabs, ActionSheetController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from '../../providers/global/global';
import { ContactComponent } from '../../components/contact/contact';
import { DatospPage } from '../datosp/datosp';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
let url = SERVER_URL;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  dato: any;
  nombre: any;
  menu;
  idUsuario;
  currencies = ['USD', 'BRL', 'EUR'];
  url;
  myaccount;
  ///  idUsuario;
  planes: any = { "tipo": 'nada' };
  tab: Tabs;
  constructor(
    public navCtrl: NavController,
    public loading: LoadingController,
    public http: Http, private app: App,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
    //  public loading: LoadingController,
  ) {
    //window.localStorage.setItem("isLogin");
    this.tab = this.navCtrl.parent;
    this.myaccount = "false";
  }
  ionViewDidLoad() {
    console.log(url);
    var data = JSON.parse(window.localStorage.getItem("isLogin"));
    console.log(data);
    this.dato = data.datos.email;
    this.nombre = data.datos.firstname + " " + data.datos.lastname;
    this.idUsuario = data.datos.id;
    this.url = url;
    this.megatest();
  }
  ionViewWillEnter() {
    this.miplanactual();
  }
  subePlan() {
    this.tab.select(1);
  }
  miplanactual() {
    //	console.log(this.idUsuario+"ss");
    let idUsuario = this.idUsuario;
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    this.http.get(url + '/miplan/' + idUsuario, options)
      .map(res => res.json())
      .subscribe(res => {
        this.planes = res;
        this.myaccount = res.myacount;
      },
        error => { console.log("error") }
      );
  }
  logout() {
    window.localStorage.removeItem("isLogin");
    this.navCtrl.setRoot(LoginPage);
    this.app.getRootNav().setRoot(LoginPage);
  }
  saveData() {
    alert("save");
  }
  autologin() {
    //  alert("autologin");
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    //var data={};
    let loader = this.loading.create({
      content: '...',
    });
    let idUser = this.idUsuario;
    loader.present()
      .then(() => {
        this.http.get(url + '/users/autologin/' + idUser, options)
          .map(res => res.json())
          .subscribe(res => {
            loader.dismiss();
          });
      });
  }
  megatest() {
    let loader = this.loading.create({
      content: 'Enviando...',
    });
    loader.dismiss();
  }
  presentPopover(myEvent) {
    this.menu = [
      { 'menu': "Datos Personales", 'icon': 'contact', 'accion': 'datosp' },
      { 'menu': "Clases gratis YouTube", 'icon': 'logo-youtube', 'accion': 'gratis' },
      { 'menu': "Cerrar sesion", 'icon': 'exit', 'accion': 'salir' }
    ];
    let popover = this.popoverCtrl.create(ContactComponent, { item: this.menu });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(i => {
      //console.log(i);

      if (i != null) {
        this.accion(i);
      }
    })
  }
  accion(accion) {
    if (accion == 0) {
      this.datosp();
    }
    if (accion == 2) {
      this.logout();
    }
  }
  miplan() {
  }
  datosp() {
    //  console.log("datospersonales");
    //console.log("miplan");
    let x = this.idUsuario;
    console.log(x);
    this.navCtrl.push(DatospPage, { idUser: x });
  }
}
