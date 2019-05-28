import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SERVER_URL } from '../../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MiplanPage } from '../miplan/miplan';
let url = SERVER_URL;
@Component({
  selector: 'page-datosp',
  templateUrl: 'datosp.html',
})
export class DatospPage {
  @ViewChild('name') name;
  @ViewChild('lastname') lastname;
  @ViewChild('email') email;
  @ViewChild('pass') pass;
  @ViewChild('pass1') pass1;
  idUser;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loading: LoadingController,
    public http: Http) {
    var data = JSON.parse(window.localStorage.getItem("isLogin"));
    this.idUser = data.datos.id;
  }

  ionViewDidLoad() {
    this.getData();
  }
  getData() {
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    this.http.get(url + '/users/getdata/' + this.idUser, options)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.email.value = res.data.email;
        this.name.value = res.data.firstname;
        this.lastname.value = res.data.lastname;

      });
  }
  update() {
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    if (this.passs()) {
      let pass = this.pass.value;
      if (pass.length < 6) {
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "Password mínimo 6 carácteres",
          buttons: ['OK']
        });
        alert.present();
      } else {
        if (this.pass.value == this.pass1.value) {
          let id = this.idUser;
          let data = {
            idUser: id,
            name: "" + this.name.value + "",
            lastname: "" + this.lastname.value + "",
            password: "" + this.pass.value + "",
          }
          this.http.post(url + '/users/updatedata', data, options)
            .map(res => res.json())
            .subscribe(res => {
              console.log(res);
              if (res.response == "ok") {
                let alert = this.alertCtrl.create({
                  title: "Info",
                  subTitle: "Datos actualizados satisfactoriamente",
                  buttons: ['OK']
                });
                alert.present();

              }
            });
        }
        else {
          let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: "El password y la confirmación no coinciden",
            buttons: ['OK']
          });
          alert.present();
        }
      }
    }
    else {
      let id = this.idUser;
      let data = {
        idUser: id,
        name: "" + this.name.value + "",
        lastname: "" + this.lastname.value + "",
        //password: "123456"
      }
      this.http.post(url + '/users/updatedata', data, options)
        .map(res => res.json())
        .subscribe(res => {
          console.log(res);
          if (res.response == "ok") {
            let alert = this.alertCtrl.create({
              title: "Info",
              subTitle: "Datos actualizados satisfactoriamente",
              buttons: ['OK']
            });
            alert.present();
          }
        });
    }
  }
  passs() {
    if ((this.pass.value == '') && (this.pass1.value == '')) {
      return false;
    }
    else {
      return true;
    }
  }
  plan() {
    let x = this.idUser;
    console.log(x);
    this.navCtrl.push(MiplanPage, { idUser: x });
  }

}
