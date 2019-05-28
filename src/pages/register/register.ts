import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
//import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../../providers/global/global';
let url = SERVER_URL;
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('firstname') firstname;
  @ViewChild('lastname') lastname;
  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('confirm') confirm;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loading: LoadingController,
    public http: Http
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  // signUp() {
  //   if ((this.firstname.value == '') || (this.lastname.value == '') || (this.email.value == '') || (this.password.value == '') || (this.confirm.value == '')) {
  //     //alert("ingrese");
  //     let alert = this.alertCtrl.create({
  //       title: "Alerta",
  //       subTitle: "Debe completar todos los datos",
  //       buttons: ['OK']
  //     });
  //     alert.present()
  //   }
  //   else {
  //     let loader = this.loading.create({
  //       content: 'Enviando...',
  //     });
  //     //loader.present();
  //     //loader.dismiss();
  //     var headers = new Headers();
  //     headers.append('Accept', 'application/json');
  //     headers.append('Content-Type', 'application/json');
  //     headers.append('Access-Control-Allow-Credentials', 'true');
  //     headers.append('Access-Control-Allow-Origin', 'http://localhost');
  //     headers.append('Access-Control-Allow-Origins', 'http://localhost');
  //     let options = new RequestOptions({ headers: headers });
  //     let data = {
  //       firstname: "" + this.firstname.value + "",
  //       lastname: "" + this.lastname.value + "",
  //       email: "" + this.email.value + "",
  //       password: "" + this.password.value + "",
  //       confirm: "" + this.confirm.value + ""
  //     }
  //     loader.present()
  //       .then(() => {
  //         this.http.post(url + '/users/register', data, options)
  //           .map(res => res.json())
  //           .subscribe(res => {
  //             loader.dismiss();
  //             console.log(res);
  //             if (res.res == "1") {
  //               let alert = this.alertCtrl.create({
  //                 title: "Alerta",
  //                 subTitle: "El email ya se encuentra registrado",
  //                 buttons: ['OK']
  //               });
  //               alert.present()
  //             } else {
  //               if (res.res == 'true') {
  //                 window.localStorage.setItem("isLogin", JSON.stringify(res));
  //                 this.navCtrl.setRoot(TabsPage);
  //               }//end if
  //               else {

  //               }
  //             }
  //           });
  //       });

  //   }

  // }
  interest() {

  //  alert("sii");
  }
}
