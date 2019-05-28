var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { App, NavController, LoadingController, PopoverController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../providers/global/global';
import { ContactComponent } from '../../components/contact/contact';
//import { GlobalProvider } from '../providers/global/global';
var url = SERVER_URL;
var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl, loading, http, app, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.loading = loading;
        this.http = http;
        this.app = app;
        this.popoverCtrl = popoverCtrl;
        this.currencies = ['USD', 'BRL', 'EUR'];
        //window.localStorage.setItem("isLogin");
    }
    ContactPage.prototype.ionViewDidLoad = function () {
        console.log(url);
        var data = JSON.parse(window.localStorage.getItem("isLogin"));
        console.log(data);
        this.dato = data.datos.email;
        this.nombre = data.datos.firstname + " " + data.datos.lastname;
        //console.log(data.datos.email);
        this.megatest();
    };
    ContactPage.prototype.logout = function () {
        window.localStorage.removeItem("isLogin");
        this.navCtrl.setRoot(LoginPage);
        this.app.getRootNav().setRoot(LoginPage);
    };
    ContactPage.prototype.megatest = function () {
        var loader = this.loading.create({
            content: 'Enviando...',
        });
        loader.dismiss();
        /*
                var headers = new Headers();
            headers.append("Accept", 'application/x-www-form-urlencoded');
            headers.append('Content-Type', 'application/x-www-form-urlencoded' );
            let options = new RequestOptions({ headers: headers });
            //var data={};
            loader.present()
            .then(() => {
              this.http.get('http://mega.com/api/users/cursos/1',options)
              .map(res => res.json())
              .subscribe(res => {
              loader.dismiss();
             // this.planes=res;
              console.log(res);
        
                });
                });
        */
    };
    ContactPage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        this.menu = [
            { 'menu': "Datos Personales", 'icon': 'contact', 'accion': 'datosp' },
            { 'menu': "Plan", 'icon': 'clipboard', 'accion': 'miplan' },
            { 'menu': "Cerrar sesion", 'icon': 'exit', 'accion': 'salir' }
        ];
        var popover = this.popoverCtrl.create(ContactComponent, { item: this.menu });
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (i) {
            //console.log(i);
            if (i != null) {
                _this.accion(i);
            }
        });
    };
    ContactPage.prototype.accion = function (accion) {
        if (accion == 0) {
            this.datosp();
        }
        if (accion == 1) {
            this.miplan();
        }
        if (accion == 2) {
            this.logout();
        }
    };
    ContactPage.prototype.miplan = function () {
        console.log("miplan");
    };
    ContactPage.prototype.datosp = function () {
        console.log("datospersonales");
    };
    ContactPage = __decorate([
        Component({
            selector: 'page-contact',
            templateUrl: 'contact.html'
        }),
        __metadata("design:paramtypes", [NavController,
            LoadingController,
            Http, App,
            PopoverController])
    ], ContactPage);
    return ContactPage;
}());
export { ContactPage };
//# sourceMappingURL=contact.js.map