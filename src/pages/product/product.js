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
//import {  } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from '../../providers/global/global';
//import { PopoverComponent } from '../components/popover/popover';
//import { AccordionListComponent } from '../components/accordion-list/accordion-list';
import 'rxjs/add/operator/map';
import { PlayPage } from '../play/play';
import { ExamenPage } from '../examen/examen';
//import { } from 'ionic-angular';
var url = SERVER_URL;
var ProductPage = /** @class */ (function () {
    function ProductPage(navCtrl, navParams, http, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.buttonClicked = false;
        this.producto = navParams.data.item.producto;
        this.imagen = navParams.data.item.imagen;
        this.plan = navParams.data.item.plan;
        console.log(this.producto);
        console.log(this.plan);
        var data = JSON.parse(window.localStorage.getItem("isLogin"));
        this.id_user = data.datos.id;
        this.nombreBoton = "más";
        this.puntos = "...";
    }
    // @ViewChild(Slides) slides: Slides;
    /*
      goToSlide() {
        this.slides.slideTo(2, 500);
      }
      slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
        console.log('Current index is', currentIndex);
      }
      */
    /*
    goToSlide() {
      this.slides.slideTo(2, 500);
    }
    
    slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
        console.log('Current index is', currentIndex);
    }
    
    */
    ProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductPage');
    };
    ProductPage.prototype.ionViewWillEnter = function () {
        this.megacursos();
    };
    ProductPage.prototype.onButtonClick = function () {
        this.buttonClicked = !this.buttonClicked;
        if (this.buttonClicked == true) {
            this.descripcionDiv = this.descripcion;
            this.nombreBoton = "menos";
            this.puntos = ".";
        }
        else {
            this.descripcionDiv = this.descripcion.substr(0, 150);
            this.nombreBoton = "más";
            this.puntos = "...";
        }
        console.log(this.buttonClicked);
    };
    ProductPage.prototype.megacursos = function () {
        var _this = this;
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        this.http.get(url + '/plans/curso/' + this.id_user + "/" + this.producto.produc.id, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            //loader.dismiss();
            /*
              var str = "Hello world!";
              var res = str.substr(1, 4);
            */
            _this.temario = res.chapter;
            _this.sliders = res.sliders;
            _this.direccion = res.direccion;
            _this.descripcion = res.descripcion;
            _this.descripcionDiv = _this.descripcion.substr(0, 150);
            _this.hora = res.hora;
            /*
            let index=0;
            
                this.interval=setInterval(function(){
                  //let currentIndex = this.slides.getActiveIndex();
                  this.slides.slideNext(index++);
            
                },2000);
            
                */
        });
    };
    ProductPage.prototype.toggleSection = function (i) {
        this.temario[i].open = !this.temario[i].open;
    };
    ProductPage.prototype.toggleItem = function (i, j) {
        this.temario[i].videos[j].open = !this.temario[i].videos[j].open;
    };
    ProductPage.prototype.play = function (video, tema, i) {
        var title = {
            orden: tema.orden,
            titulo: tema.titulo,
            modulo: i
        };
        //console.log(title);
        var plan = this.plan;
        var producto = this.producto;
        //console.log(producto);
        this.navCtrl.push(PlayPage, { item: video, plan: plan, producto: producto, title: title });
        //console.log(video);
    };
    ProductPage.prototype.examen = function () {
        console.log(this.plan);
        if (this.plan.nombre == "Gratis") {
            //alert("gratis");
            var toast = this.toastCtrl.create({
                message: 'Sube de Plan y certificate',
                duration: 2000,
                position: 'middle',
                cssClass: "toast-success"
            });
            toast.present();
        }
        else {
            var producto = this.producto;
            console.log(producto);
            this.navCtrl.push(ExamenPage, { producto: producto });
        }
        //
    };
    /*
    slidesDidLoad(slides: Slides) {
      slides.startAutoplay();
    }
    */
    ProductPage.prototype.slidesDidLoad = function (slides) {
        slides.startAutoplay();
    };
    ProductPage = __decorate([
        Component({
            selector: 'page-product',
            templateUrl: 'product.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Http,
            ToastController])
    ], ProductPage);
    return ProductPage;
}());
export { ProductPage };
//# sourceMappingURL=product.js.map