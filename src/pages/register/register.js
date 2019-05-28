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
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
//import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../../providers/global/global';
var url = SERVER_URL;
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//@IonicPage()
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, alertCtrl, loading, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loading = loading;
        this.http = http;
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.signUp = function () {
        var _this = this;
        if ((this.firstname.value == '') || (this.lastname.value == '') || (this.email.value == '') || (this.password.value == '') || (this.confirm.value == '')) {
            //alert("ingrese");
            var alert_1 = this.alertCtrl.create({
                title: "Alerta",
                subTitle: "Debe completar todos los datos",
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var loader_1 = this.loading.create({
                content: 'Enviando...',
            });
            //loader.present();
            //loader.dismiss();
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Credentials', 'true');
            headers.append('Access-Control-Allow-Origin', 'http://localhost');
            headers.append('Access-Control-Allow-Origins', 'http://localhost');
            var options_1 = new RequestOptions({ headers: headers });
            var data_1 = {
                firstname: "" + this.firstname.value + "",
                lastname: "" + this.lastname.value + "",
                email: "" + this.email.value + "",
                password: "" + this.password.value + "",
                confirm: "" + this.confirm.value + ""
            };
            loader_1.present()
                .then(function () {
                _this.http.post(url + '/users/register', data_1, options_1)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    loader_1.dismiss();
                    console.log(res);
                    if (res.res == 'true') {
                        window.localStorage.setItem("isLogin", JSON.stringify(res));
                        //window.localStorage.setItem("data", res.datos);
                        /*
                        let alert = this.alertCtrl.create({
                        title:"Excelente",
                        subTitle:"good",
                        buttons: ['OK']
                        });
                        alert.present();
                        */
                        _this.navCtrl.setRoot(TabsPage);
                        //console.log()
                    } //end if
                    else {
                        /*
                        let alert = this.alertCtrl.create({
                        title:"Error",
                        subTitle:"Datos Incorrectos",
                        buttons: ['OK']
                        });
                        alert.present();
        */
                    }
                });
            });
        }
    };
    RegisterPage.prototype.interest = function () {
        alert("sii");
    };
    __decorate([
        ViewChild('firstname'),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "firstname", void 0);
    __decorate([
        ViewChild('lastname'),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "lastname", void 0);
    __decorate([
        ViewChild('email'),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "email", void 0);
    __decorate([
        ViewChild('password'),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "password", void 0);
    __decorate([
        ViewChild('confirm'),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "confirm", void 0);
    RegisterPage = __decorate([
        Component({
            selector: 'page-register',
            templateUrl: 'register.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AlertController,
            LoadingController,
            Http])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map