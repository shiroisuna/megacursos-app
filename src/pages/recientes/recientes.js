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
import { NavController, NavParams, PopoverController, Content, Events } from 'ionic-angular';
import { SERVER_URL } from '../../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PopoverComponent } from '../../components/popover/popover';
var url = SERVER_URL;
var RecientesPage = /** @class */ (function () {
    function RecientesPage(navCtrl, navParams, http, popoverCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.modulos = [];
        this.idModulo = {};
        this.ultimaClase = {};
        this.moduloActual = {};
        this.idChapter = navParams.data.idChapter;
        this.idCurso = navParams.data.idCurso;
        var data = JSON.parse(window.localStorage.getItem("isLogin"));
        this.idUsuario = data.datos.id;
    }
    RecientesPage.prototype.scrollTo = function (element) {
        var yOffset = document.getElementById(element).offsetTop;
        this.pageTop.scrollTo(0, yOffset, 4000);
    };
    RecientesPage.prototype.ionViewDidLoad = function () {
        console.log(this.idChapter);
        console.log('ionViewDidLoad RecientesPage');
        console.log(this.idCurso);
        // events.subscribe('posts:listed', (data) => {
        //----
        //----
        // this.content.scrollToTop();
        // this.pageTop.scrollToTop();
        //});
    };
    RecientesPage.prototype.ionViewWillEnter = function () {
        this.recientes();
        /*
       if (jwplayer("myDiv").getState()=="paused")
       {
           //return;
       }
       else{
          
       }
     */
    };
    RecientesPage.prototype.recientes = function () {
        var _this = this;
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        this.http.get(url + '/users/reciente/' + this.idChapter + '/' + this.idCurso + '/' + this.idUsuario, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.ultimaClase = res.ultimaClase;
            _this.getVideo(_this.ultimaClase.id_syllabus_chapter);
            _this.modulos = res.modulos;
            _this.idModulo = res.moduloActivo.part_no;
            var x;
            for (var _i = 0, _a = _this.modulos; _i < _a.length; _i++) {
                var modulo = _a[_i];
                x = 0;
                if (modulo.id == _this.idModulo) {
                    _this.moduloActual = modulo;
                    console.log("aqui");
                    var bandera = true;
                    break;
                    //return;
                }
                x++;
            }
            console.log(x);
            _this.indexI = x;
            console.log(_this.moduloActual);
            console.log(_this.indexI);
        });
    };
    RecientesPage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(PopoverComponent, { item: this.modulos });
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (i) {
            //console.log(i);
            if (i != null) {
                _this.moduloActual = _this.modulos[i];
                _this.indexI = i;
            }
            console.log(_this.indexI);
        });
    };
    RecientesPage.prototype.playVideo = function (video, chapter) {
        //console.log("video")
        console.log(video);
        console.log(chapter);
        //alert(video);
        //var url="assets/video/Clase2_Biped.mp4";
        //var url=video;
        //console.log(video);
        //return;
        var idchapter = video.id_syllabus_chapter;
        console.log("id" + idchapter);
        //var index=i;
        this.status = video.status;
        var visto = video.visto;
        console.log(visto);
        //var j=j;
        var porcentaje, total;
        //var interval;
        var y = this;
        /*
        if (this.plan.nombre=="Gratis"){
        jwplayer("myDiv")
        .setup({
        "file": "https://megacursos.com/themes/video/samples/%E2%99%A5%20Conquista%20mujeres%20con%20dise%C3%B1o%20gr%C3%A1fico%20%E2%99%A5-qM8VQHpwKBg.mp4",
        "autostart": "true",
        "height":"30%" ,
        "width": "100%",
        //"volume": 50,
        //"host": "http://localhost:8100",
        });
            console.log("gratis");
            return;
        }
        */
        jwplayer("myDiv")
            .setup({
            "playlist": chapter,
            //"file":"assets/video/Clase2_Biped.mp4",
            "autostart": "false",
            "height": "40%",
            "width": "100%",
        })
            .onPlay(function (event) {
            console.log(event);
            if (y.status == 0) {
                jwplayer().on('firstFrame', function () {
                    jwplayer("myDiv").seek(visto);
                });
            }
        })
            .onTime(function (event) {
            if (y.status == 0) {
                if ((event.position - visto) > 2) {
                    //console.log("adelanto");
                    jwplayer("myDiv").seek(visto);
                }
                total = event.duration;
                visto = event.position;
                porcentaje = Math.floor((visto * 100) / total);
            }
        });
        clearInterval(this.interval);
        this.interval = setInterval(function () {
            console.log(jwplayer("myDiv").getState());
            if (jwplayer("myDiv").getState() == "paused") {
                return;
            }
            if (porcentaje == undefined) {
                console.log("undefined");
            }
            else {
                if (y.status == 0) {
                    console.log(total);
                    console.log(visto);
                    console.log(porcentaje);
                    y.saveVideo(porcentaje, idchapter, visto);
                }
            }
        }, 10000);
    };
    RecientesPage.prototype.saveVideo = function (porcentaje, idchapter, visto) {
        this.porcentajex = porcentaje + "%";
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var data = {
            porcentaje: porcentaje,
            idchapter: idchapter,
            visto: Math.floor(visto),
            id_usuario: this.idUsuario,
            curso: this.ultimaClase.idcurso
        };
        console.log(data);
        this.http.post(url + '/users/update_video', data, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
        });
    };
    RecientesPage.prototype.getVideo = function (id) {
        var _this = this;
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        this.http.get(url + '/users/getvideo/' + id)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            //console.log("si");
            _this.playVideo(_this.ultimaClase, res);
            console.log(res);
        });
    };
    RecientesPage.prototype.ionViewWillLeave = function () {
        clearInterval(this.interval);
        this.pausado();
        console.log("Salir Salir Salir Salir Salir");
    };
    RecientesPage.prototype.pausado = function () {
        if (jwplayer("myDiv").getState() == "paused") {
        }
        else {
            jwplayer("myDiv").pause();
        }
    };
    /*
      route.selected = false;
    
    selectCP(route){
       route.selected =! route.selected;
    }
    */
    RecientesPage.prototype.openPage = function (page) {
        this.getVideo(page);
        //this.
        console.log(page);
        this.scrollTo("myDiv");
        //this.pageTop.scrollToTop();
        // let scrollContent: Content = document.getElementById("myDiv");
        //scrollContent.scrollToTop;
        //this.nav.setRoot(page.component);
        /*
        page.color='danger';
    
        for (let p of this.pages) {
        
        if(p.title==page.title)
        {
          p.color='danger';
        }
        else
        {
          p.color='light';
        }
        
        }
        */
    };
    __decorate([
        ViewChild('pageTop'),
        __metadata("design:type", Content)
    ], RecientesPage.prototype, "pageTop", void 0);
    RecientesPage = __decorate([
        Component({
            selector: 'page-recientes',
            templateUrl: 'recientes.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Http,
            PopoverController,
            Events])
    ], RecientesPage);
    return RecientesPage;
}());
export { RecientesPage };
/*


Provisional headers are shown
Accept-Encoding: identity;q=1, *;q=0
Range: bytes=388792320-
Referer: https://d202tisf3t2pcm.cloudfront.net/courses/3D+studio+max/v1/p1/21+Animacion/Clase+Inicial/Clase20_Animacion.mp4
User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Mobile Safari/537.36


'HTMLVideoElement.webkitDisplayingFullscreen' is deprecated. Please use 'Document.fullscreenElement' instead.

*/ 
//# sourceMappingURL=recientes.js.map