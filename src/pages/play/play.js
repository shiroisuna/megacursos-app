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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { PlanPage1 } from '../plan/plan';
import { SERVER_URL } from '../../providers/global/global';
var url = SERVER_URL;
var PlayPage = /** @class */ (function () {
    //jwplayer;
    function PlayPage(navCtrl, navParams, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.para = false;
        this.video = navParams.data.item;
        this.plan = navParams.data.plan;
        this.producto = navParams.data.producto;
        this.title = navParams.data.title;
        var data = JSON.parse(window.localStorage.getItem("isLogin"));
        this.id_usuario = data.datos.id;
        this.porcentajex = this.video.porcentaje + "%";
        //	console.log(this.video);
        //	console.log(this.producto);
    }
    PlayPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Play');
    };
    PlayPage.prototype.cc = function () {
        console.log("sss");
        if (this.para == false) {
            var loading_1 = this.loadingCtrl.create({
                content: ''
            });
            loading_1.present();
            setTimeout(function () {
                loading_1.dismiss();
            }, 1000);
        }
        this.para = true;
    };
    PlayPage.prototype.ionViewWillEnter = function () {
        console.log(this.video);
        console.log(this.plan);
        this.getVideo(this.video.id_video);
        // this.playVideo(this.video);
    };
    PlayPage.prototype.ionViewWillLeave = function () {
        clearInterval(this.interval);
        this.paused();
        console.log("Salir Salir Salir Salir Salir");
    };
    PlayPage.prototype.paused = function () {
        jwplayer("myDiv").pause();
        console.log("stop");
    };
    PlayPage.prototype.subePlan = function () {
        console.log("subePlan");
        this.navCtrl.push(PlanPage1);
    };
    PlayPage.prototype.playVideo = function (video, chapter) {
        //alert(video);
        //var url="assets/video/Clase2_Biped.mp4";
        //var url=video;
        //console.log(video);
        //return;
        var idchapter = video.id_video;
        //console.log("id"+idchapter);
        //var index=i;
        this.status = video.status;
        var visto = video.ultima;
        //var j=j;
        var porcentaje, total;
        //var interval;
        var y = this;
        if ((this.plan.nombre == "Gratis") && (this.producto.produc.licencia == "false")) {
            jwplayer("myDiv")
                .setup({
                "file": "https://megacursos.com/themes/video/samples/%E2%99%A5%20Conquista%20mujeres%20con%20dise%C3%B1o%20gr%C3%A1fico%20%E2%99%A5-qM8VQHpwKBg.mp4",
                "autostart": "true",
                "height": "30%",
                "width": "100%",
            });
            console.log("gratis sin licencia");
            return;
        }
        jwplayer("myDiv")
            .setup({
            "playlist": chapter,
            "autostart": "false",
            "height": "40%",
            "width": "100%",
        })
            .onPlay(function (event) {
            y.cc();
            console.log(event);
            if (y.status == 0) {
                jwplayer().on('firstFrame', function () {
                    jwplayer("myDiv").seek(visto);
                });
            }
        })
            .onTime(function (event) {
            if ((y.status == 0) || (this.producto.produc.licencia == "false")) {
                if ((event.position - visto) > 2) {
                    //console.log("adelanto");
                    jwplayer("myDiv").seek(visto);
                }
                total = event.duration;
                visto = event.position;
                porcentaje = Math.floor((visto * 100) / total);
                //y.video.porcentaje=porcentaje;
                // console.log(porcentaje);
                // this.calculo(porcentaje,j,index);
            }
        });
        clearInterval(this.interval);
        this.interval = setInterval(function () {
            // porcentaje=Math.floor((visto*100)/total); 
            /*
            if (porcentaje>95){
              this.status=1;
              //y.parts.chapter[j].videos[index].status=1;
            }
            */
            //y.parts.chapter[j].videos[index].porcentaje=porcentaje; 
            // total=event.duration;
            //  console.log("Posicion:"+event.posicion);
            // porcentaje=Math.floor((visto*100)/total); 
            if (porcentaje == undefined) {
                console.log("undefined");
            }
            else {
                console.log(total);
                console.log(visto);
                console.log(porcentaje);
                y.saveVideo(porcentaje, idchapter, visto);
            }
        }, 10000);
    };
    PlayPage.prototype.saveVideo = function (porcentaje, idchapter, visto) {
        this.porcentajex = porcentaje + "%";
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var data = {
            porcentaje: porcentaje,
            idchapter: idchapter,
            visto: Math.floor(visto),
            id_usuario: this.id_usuario,
            curso: this.producto.produc.id
        };
        console.log(data);
        this.http.post(url + '/users/update_video', data, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
        });
    };
    PlayPage.prototype.getVideo = function (id) {
        var _this = this;
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        this.http.get(url + '/users/getvideo/' + id)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            //console.log("si");
            _this.playVideo(_this.video, res);
            console.log(res);
        });
    };
    PlayPage = __decorate([
        Component({
            selector: 'page-play',
            templateUrl: 'play.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Http,
            LoadingController])
    ], PlayPage);
    return PlayPage;
}());
export { PlayPage };
//# sourceMappingURL=play.js.map