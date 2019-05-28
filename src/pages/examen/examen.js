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
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from '../../providers/global/global';
import { MegatestDetalle } from '../detalles-megates/detalles-megates';
//import { PopoverComponent } from '../components/popover/popover';
//import { AccordionListComponent } from '../components/accordion-list/accordion-list';
import 'rxjs/add/operator/map';
var url = SERVER_URL;
var ExamenPage = /** @class */ (function () {
    function ExamenPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.producto = navParams.data.producto;
        var data = JSON.parse(window.localStorage.getItem("isLogin"));
        this.idUser = data.datos.id;
    }
    ExamenPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Examen');
        console.log(this.producto);
    };
    ExamenPage.prototype.ionViewWillEnter = function () {
        this.megatest();
    };
    ExamenPage.prototype.megatest = function () {
        var _this = this;
        //console.log(this.producto.produc.id+"-"+this.idUser);
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        this.http.get(url + '/users/examen/' + this.idUser + "/" + this.producto.produc.id, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            //loader.dismiss();
            _this.examenes = res.examen;
            console.log(_this.examenes);
        });
        //alert("si");
    };
    ExamenPage.prototype.nuevoTest = function () {
        this.item = { curso: this.producto.produc.id };
        //console.log(this.item);
        this.navCtrl.push(MegatestDetalle, { item: this.item });
    };
    ExamenPage = __decorate([
        Component({
            selector: 'page-examen',
            templateUrl: 'examen.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Http])
    ], ExamenPage);
    return ExamenPage;
}());
export { ExamenPage };
//# sourceMappingURL=examen.js.map