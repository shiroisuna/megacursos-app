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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../../providers/global/global';
var url = SERVER_URL;
/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//@IonicPage()
var ResetpasswordPage = /** @class */ (function () {
    function ResetpasswordPage(navCtrl, navParams, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    ResetpasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ResetpasswordPage');
    };
    ResetpasswordPage.prototype.close = function () {
        this.navCtrl.pop(); //cierro el nabvar detalles
        //alert("close");
    };
    ResetpasswordPage.prototype.resetPassword = function () {
        var _this = this;
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        //let emaill=this.email.value;
        //password: ""+this.password.value+""
        //}
        var data = {
            email: "" + this.email.value + "",
        };
        this.http.post(url + '/users/forgotpassword', data, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            //loader.dismiss();
            console.log(res);
            if (res.response == 'true') {
                var alert_1 = _this.alertCtrl.create({
                    title: "Genial.!",
                    subTitle: "Cambio de Clave satisfatorio, por favor revise su email e inicie sessión",
                    buttons: ['OK']
                });
                alert_1.present();
                _this.navCtrl.pop(); //this.close();
            } //end if
            else {
                //console.log("mal");
                var alert_2 = _this.alertCtrl.create({
                    title: "Error",
                    subTitle: "El email no se encuentra registrado",
                    buttons: ['OK']
                });
                alert_2.present();
            }
        });
    };
    __decorate([
        ViewChild('email'),
        __metadata("design:type", Object)
    ], ResetpasswordPage.prototype, "email", void 0);
    ResetpasswordPage = __decorate([
        Component({
            selector: 'page-resetpassword',
            templateUrl: 'resetpassword.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Http,
            AlertController])
    ], ResetpasswordPage);
    return ResetpasswordPage;
}());
export { ResetpasswordPage };
//# sourceMappingURL=resetpassword.js.map