import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { HttpClientJsonpModule, HttpClientModule, HttpClient } from "@angular/common/http";
//import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';
import { SERVER_URL } from '../../providers/global/global';
import { RegisterPage } from '../register/register';
import { PlanPage1 } from '../plan/plan';
import { HomePage } from '../home/home';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
let url = SERVER_URL;
//import {  } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('email') email;
  @ViewChild('password') password;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loading: LoadingController,
    private http: Http) {

  }
  ionViewDidEnter() {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  eventHandler(code){
    // if (code==13){
    //   this.signIn();
    // }
  //  console.log(code);
  }
  suscribe(){
      this.navCtrl.push(PlanPage1);

  }
  signIn() {
    this.navCtrl.push(HomePage);

    // if ((this.email.value == '') || (this.password.value == '')) {

    //   //alert("ingrese");
    //   let alert = this.alertCtrl.create({
    //     title: "Alerta",
    //     subTitle: "Ingrese Email y/o contraseña",
    //     buttons: ['OK']
    //   });
    //   alert.present()

    // }
    // else {
    //   let loader = this.loading.create({
    //     content: 'Enviando...',
    //   });
    //   //loader.present();
    //   //loader.dismiss();
    //   var headers = new Headers();
    //   // headers.append('Accept', 'application/jsonp');
    //   headers.append('Access-Control-Allow-Origin', '*');
    //   headers.append('Content-Type', 'application/json');
    //   // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE');
    //   headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested');
    //   // headers.append('Access-Control-Allow-Origins', '*');
    //   let options = new RequestOptions({ headers: headers });
    //   let data = {
    //     email: "" + this.email.value + "",
    //     password: "" + this.password.value + ""
    //   }
    //   loader.present()
    //     .then(() => {
    //       this.http.post(url + '/users/login', data, options)
    //         .map(res => res.json())
    //         .subscribe(res => {
    //           loader.dismiss();
    //           console.log(res);
    //           if (res.res == 'true') {
    //             window.localStorage.setItem("isLogin", JSON.stringify(res));
    //             //window.localStorage.setItem("data", res.datos);
                
    //             let alert = this.alertCtrl.create({
    //             title:"Excelente",
    //             subTitle:"good",
    //             buttons: ['OK']
    //             });
    //             alert.present();
                
                this.navCtrl.setRoot(TabsPage);
                //console.log()
    //           }//end if
    //           else {
    //             let alert = this.alertCtrl.create({
    //               title: "Información",
    //               subTitle: "Estas credenciales no coinciden con nuestros registros,por favor revise sus datos de acceso.",
    //               buttons: ['OK']
    //             });
    //             alert.present();
    //           }
    //         });
    //     });
    // }
  }
  resetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }

  // signUp() {
  //   window.localStorage.setItem("idUsuario", "idUsuario");
  //   alert("si");
  // }

  goToSignup() {
    this.navCtrl.push(RegisterPage);
  }
}
