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
import { NavController, Nav, MenuController } from 'ionic-angular';
import { RecientesPage } from '../recientes/recientes';
import { SERVER_URL } from '../../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { NetworkInterface } from '@ionic-native/network-interface';
var url = SERVER_URL;
var HomePage = /** @class */ (function () {
    //reci:any[] = [];
    function HomePage(navCtrl, nav, menuCtrl, http) {
        this.navCtrl = navCtrl;
        this.nav = nav;
        this.menuCtrl = menuCtrl;
        this.http = http;
        this.reciente = [];
        this.tab = this.navCtrl.parent;
        this.parrafo = "Bienvenidos todos los diseñadores gráficos al Megaconcurso Ecológico patrocinado por Megacursos, todos los diseñadores .......";
        var data = JSON.parse(window.localStorage.getItem("isLogin"));
        if (data) {
            this.idUser = data.datos.id;
        }
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.recientes();
    };
    HomePage.prototype.recientes = function () {
        var _this = this;
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Access-Control-Allow-Origin', 'true');
        var options = new RequestOptions({ headers: headers });
        this.http.get(url + '/users/getrecientes/' + this.idUser, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            // this.total=12;
            _this.reciente = res.recientes;
            _this.url = res.url;
            //console.log(res.recientes);
            if (res.recientes == null) {
                _this.total = 0;
                // console.log("null");
            }
            else {
                _this.total = _this.reciente.length;
                // console.log("nonull");
            }
        });
    };
    HomePage.prototype.openPage = function (page) {
        this.tab.select(page);
    };
    HomePage.prototype.allCourses = function () {
        this.tab.select(2);
    };
    HomePage.prototype.getRecientes = function (idChapter, idCurso) {
        /*
        console.log(idCurso);
        console.log(idChapter);
        */
        this.navCtrl.push(RecientesPage, { idChapter: idChapter, idCurso: idCurso });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            Nav,
            MenuController,
            Http])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map