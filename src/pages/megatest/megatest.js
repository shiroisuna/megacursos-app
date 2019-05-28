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
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MegatestDetalle } from '../detalles-megates/detalles-megates';
import { PopovermegatestComponent } from '../../components/popovermegatest/popovermegatest';
import 'rxjs/add/operator/map';
var MegatestPage = /** @class */ (function () {
    function MegatestPage(navCtrl, navParams, http, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.popoverCtrl = popoverCtrl;
    }
    MegatestPage.prototype.ionViewDidLoad = function () {
        var data = JSON.parse(window.localStorage.getItem("isLogin"));
        this.id_user = data.datos.id;
        console.log(this.id_user);
        // this.megatest();
    };
    MegatestPage.prototype.menuMegatest = function (myEvent, curso) {
        var _this = this;
        var popover = this.popoverCtrl.create(PopovermegatestComponent, { item: curso });
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (i) {
            console.log(i);
            //console.log(curso);
            _this.item = { curso: curso };
            //console.log(this.item);
            _this.navCtrl.push(MegatestDetalle, { item: _this.item });
        });
    };
    MegatestPage.prototype.ionViewWillEnter = function () {
        //console.log(this.navCtrl);
        console.log("si");
        this.megatest();
    };
    MegatestPage.prototype.megatest = function () {
        var _this = this;
        /*
          let loader = this.loading.create({
                content: 'Enviando...',
                });*/
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        this.http.get('http://mega.com/api/users/curso/' + this.id_user, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            //loader.dismiss();
            _this.planes = res;
            console.log(res);
            //});
        });
    };
    MegatestPage.prototype.iniciar = function (curso) {
        //console.log(curso);
        this.item = { curso: curso };
        console.log(this.item);
        this.navCtrl.push(MegatestDetalle, { item: this.item });
    };
    MegatestPage.prototype.detalles = function (curso) {
        console.log(curso);
    };
    MegatestPage = __decorate([
        Component({
            selector: 'page-megatest',
            templateUrl: 'megatest.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Http, PopoverController])
    ], MegatestPage);
    return MegatestPage;
}());
export { MegatestPage };
//# sourceMappingURL=megatest.js.map