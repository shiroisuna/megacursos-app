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
import { NavController, NavParams, Nav, MenuController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from '../../providers/global/global';
//import { PopoverComponent } from '../components/popover/popover';
//import { AccordionListComponent } from '../components/accordion-list/accordion-list';
import 'rxjs/add/operator/map';
import { ProductPage } from '../product/product';
var url = SERVER_URL;
//@IonicPage()
var MegacursosPage = /** @class */ (function () {
    function MegacursosPage(navCtrl, navParams, http, nav, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.nav = nav;
        this.menuCtrl = menuCtrl;
        this.searchQuery = '';
        this.plan = {};
        this.tab = this.navCtrl.parent;
    }
    MegacursosPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        // this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        console.log(val);
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.categories = this.categories.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.categories = this.catego;
        }
    };
    MegacursosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MegacursosPage');
        var data = JSON.parse(window.localStorage.getItem("isLogin"));
        this.id_user = data.datos.id;
    };
    MegacursosPage.prototype.ionViewWillEnter = function () {
        this.megacursos();
    };
    MegacursosPage.prototype.details = function (imagen, hijo, category) {
        var plan = this.plan;
        this.item = { producto: hijo, imagen: imagen, plan: plan };
        this.navCtrl.push(ProductPage, { item: this.item });
    };
    MegacursosPage.prototype.megacursos = function () {
        var _this = this;
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        this.http.get(url + '/plans/megacursos/' + this.id_user, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            //loader.dismiss();
            _this.categories = res.categorias;
            _this.catego = res.categorias;
            _this.plan = res.plans;
            // this.compras=res.compras;
            console.log(_this.plan);
            console.log(_this.catego);
            //console.log(this.compras);
            //});
        });
    };
    MegacursosPage.prototype.openPage = function (page) {
        this.tab.select(page);
    };
    MegacursosPage = __decorate([
        Component({
            selector: 'page-megacursos',
            templateUrl: 'megacursos.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Http,
            Nav,
            MenuController])
    ], MegacursosPage);
    return MegacursosPage;
}());
export { MegacursosPage };
//# sourceMappingURL=megacursos.js.map