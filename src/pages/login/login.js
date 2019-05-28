var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';
import { SERVER_URL } from '../../providers/global/global';
import { RegisterPage } from '../register/register';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
var url = SERVER_URL;
//import {  } from 'ionic-angular';
/**
/home/megacursos/AppMegacursos/www
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, modalCtrl, alertCtrl, loading, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.loading = loading;
        this.http = http;
    }
    LoginPage.prototype.ionViewDidEnter = function () {
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
     LoginPage.prototype.signIn = function () {
    //     var _this = this;
    //     if ((this.email.value == '') || (this.password.value == '')) {
    //         //alert("ingrese");
    //         var alert_1 = this.alertCtrl.create({
    //             title: "Alerta",
    //             subTitle: "Ingrese Email y/o contraseña",
    //             buttons: ['OK']
    //         });
    //         alert_1.present();
    //     }
    //     else {
    //         var loader_1 = this.loading.create({
    //             content: 'Enviando...',
    //         });
    //         //loader.present();
    //         //loader.dismiss();
    //         var headers = new Headers();
    //         headers.append('Access-Control-Allow-Origin', '*');
    //         headers.append('Content-Type', 'application/json');
    //         // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE');
    //         headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested');
    //         var options_1 = new RequestOptions({ headers: headers });
    //         var data_1 = {
    //             email: "" + this.email.value + "",
    //             password: "" + this.password.value + ""
    //         };
    //         loader_1.present()
    //             .then(function () {
    //             _this.http.post(url + '/users/login', data_1, options_1)
    //                 .map(function (res) { return res.json(); })
    //                 .subscribe(function (res) {
    //                 loader_1.dismiss();
    //                 console.log(res);
    //                 if (res.res == 'true') {
    //                     window.localStorage.setItem("isLogin", JSON.stringify(res));
    //                     //window.localStorage.setItem("data", res.datos);
    //                     /*
    //                     let alert = this.alertCtrl.create({
    //                     title:"Excelente",
    //                     subTitle:"good",
    //                     buttons: ['OK']
    //                     });
    //                     alert.present();
    //                     */
                        _this.navCtrl.setRoot(HomePage);
    //                     //console.log()
    //                 } //end if
    //                 else {
    //                     var alert_2 = _this.alertCtrl.create({
    //                         title: "Error",
    //                         subTitle: "Datos Incorrectos",
    //                         buttons: ['OK']
    //                     });
    //                     alert_2.present();
    //                 }
    //             });
    //         });
    //     }
    };
    LoginPage.prototype.resetPassword = function () {
        this.navCtrl.push(ResetpasswordPage);
        //this.modalCtrl.create('ResetpasswordPage', null, { cssClass: 'inset-modal' })
        //   .present();
    };
    // LoginPage.prototype.signUp = function () {
    //     window.localStorage.setItem("idUsuario", "idUsuario");
    //     alert("si");
    // };
    LoginPage.prototype.goToSignup = function () {
        this.navCtrl.push(RegisterPage);
    };
    __decorate([
        ViewChild('email'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "email", void 0);
    __decorate([
        ViewChild('password'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "password", void 0);
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ModalController,
            AlertController,
            LoadingController,
            Http])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map