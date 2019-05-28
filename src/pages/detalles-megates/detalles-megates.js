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
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../../providers/global/global';
var url = SERVER_URL;
var MegatestDetalle = /** @class */ (function () {
    function MegatestDetalle(navCtrl, navParams, http, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.curso = {};
        this.preguntas = {};
        this.curso = navParams.data.item.curso;
    }
    MegatestDetalle.prototype.ionViewDidLoad = function () {
        console.log('detalles');
        console.log(this.curso);
        var data = JSON.parse(window.localStorage.getItem("isLogin"));
        this.id_user = data.datos.id;
    };
    MegatestDetalle.prototype.ionViewWillEnter = function () {
        this.iniciar();
        this.contadorr();
    };
    MegatestDetalle.prototype.comprobar = function (idrespuesta) {
        var _this = this;
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        this.http.get(url + '/users/megatest_comprobar/' + this.preguntas.id_pregunta + "/" + idrespuesta + "/" + this.preguntas.id_megatest + "/" + this.preguntas.id_curso, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            //loader.dismiss();
            console.log(res);
            //this.result=res.response;
            if (res.response.mensaje == "true") {
                //presentToast() {
                var toast = _this.toastCtrl.create({
                    message: 'Respuesta Correcta',
                    duration: 2000,
                    position: 'bottom',
                    cssClass: "toast-success"
                });
                toast.present();
                //console.log("si");
                //this.preguntas=res.response;
                //console.log(this.preguntas);
            }
            if (res.response.mensaje == "false") {
                var toast = _this.toastCtrl.create({
                    message: 'Respuesta Incorrecta',
                    duration: 2000,
                    position: 'bottom',
                    cssClass: "toast-success"
                });
                toast.present();
                //console.log("no");
                //this.preguntas=res.response;
                //console.log(this.preguntas);
            }
            _this.iniciar();
            console.log("res");
            //});
        });
    };
    MegatestDetalle.prototype.iniciar = function () {
        var _this = this;
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        this.http.get(url + '/users/megatestc/' + this.id_user + "/" + this.curso, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            //loader.dismiss();
            //this.test=res;
            _this.visible = "true";
            if (res.code == 0) {
                _this.preguntas = res.response;
                console.log(_this.preguntas);
                //console.log("dddd"+);
                //this.idMegatest
                //console.log(this.preguntas.id_megatest);
                //console.log(this.preguntas.id_megatest);
                //this.contadorr(this.preguntas.id_megatest);
                _this.idMegatest = res.response.id_megatest;
                //console.log("id"+this.idMegatest);
                window.localStorage.setItem("idmegatest", _this.idMegatest);
            }
            if (res.code == 10) {
                console.log("fin megatest");
                clearInterval(_this.interval);
                if (res.response.status == "Aprobado") {
                    //console.log("reprobado");
                    var fin = _this.toastCtrl.create({
                        message: 'Megatest Aprobado, Nota Obtenida:' + res.response.nota + "%" + " Minimo para aprobar:" + res.response.nota_minima + "%/100%",
                        //duration: 3000,
                        position: 'middle',
                        showCloseButton: true,
                        closeButtonText: "ok",
                        cssClass: "toast-success"
                    });
                    fin.onDidDismiss(function () {
                        //console.log('fin toast');
                        _this.navCtrl.pop(); //cierro el nabvar detalles
                    });
                    fin.present();
                }
                if (res.response.status == "Reprobado") {
                    //console.log("reprobado");
                    var fin = _this.toastCtrl.create({
                        message: 'Megatest Reprobado, Nota Obtenida:' + res.response.nota + "%" + " Minimo para aprobar:" + res.response.nota_minima + "%/100%",
                        //duration: 3000,
                        position: 'middle',
                        showCloseButton: true,
                        closeButtonText: "ok",
                        cssClass: "toast-success"
                    });
                    fin.onDidDismiss(function () {
                        //console.log('fin toast');
                        _this.navCtrl.pop(); //cierro el nabvar detalles
                    });
                    fin.present();
                }
            }
            if (res.code == 30) {
                _this.visible = "false";
                var fin = _this.toastCtrl.create({
                    message: res.mensaje + "." + res.motivo + "." + res.tiempo,
                    //duration: 3000,
                    position: 'middle',
                    showCloseButton: true,
                    closeButtonText: "ok",
                    cssClass: "toast-success"
                });
                fin.onDidDismiss(function () {
                    //console.log('fin toast');
                    _this.navCtrl.pop(); //cierro el nabvar detalles
                });
                fin.present();
                //and (res.mensaje=="Penalizado")){
                //console.log("fin");
            }
            if (res.code == 20) {
                _this.visible = "false";
                var fin = _this.toastCtrl.create({
                    message: res.mensaje + "." + res.motivo,
                    //duration: 3000,
                    position: 'middle',
                    showCloseButton: true,
                    closeButtonText: "ok",
                    cssClass: "toast-success"
                });
                fin.onDidDismiss(function () {
                    //console.log('fin toast');
                    _this.navCtrl.pop(); //cierro el nabvar detalles
                });
                fin.present();
                //and (res.mensaje=="Penalizado")){
                //console.log("fin");
            }
            //});
        });
    };
    MegatestDetalle.prototype.ionViewWillLeave = function () {
        clearInterval(this.interval);
        console.log("salir");
    };
    MegatestDetalle.prototype.contadorr = function () {
        //alert(id);
        var y = this;
        var interval, a;
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        //var y=this;
        a = 0;
        this.interval = setInterval(function () {
            //var id=;
            var id = window.localStorage.getItem("idmegatest");
            console.log("ddddd" + id);
            y.http.get(url + '/users/megatest_transcurrido/' + id, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                if (res.code == "activo") {
                    y.restante = res.restante;
                }
                if (res.code == "finTest") {
                    //y.parar();
                    //a=1;
                    clearInterval(y.interval);
                    console.log('fin');
                }
                //console.log(res);
            });
            //console.log(id);
        }, 2000);
    };
    MegatestDetalle.prototype.parar = function () {
        /*return (interval) => {
        console.log("inside the return of the observable");
        clearInterval(interval);
    }*/
        alert("arar");
        clearInterval(this.interval);
    };
    MegatestDetalle = __decorate([
        Component({
            selector: 'page-detalles-megates',
            templateUrl: 'detalles-megates.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Http, ToastController])
    ], MegatestDetalle);
    return MegatestDetalle;
}());
export { MegatestDetalle };
//# sourceMappingURL=detalles-megates.js.map