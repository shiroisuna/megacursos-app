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
import { SucribePage } from '../paysuscripage/paysuscripage';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../../providers/global/global';
var url = SERVER_URL;
//@IonicPage()
var PlanPage1 = /** @class */ (function () {
    function PlanPage1(navCtrl, navParams, loading, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.http = http;
        this.planx = [];
        this.currencies = ['usd', 'brl', 'eur', 'pen'];
        this.currencyUser = {};
    }
    PlanPage1.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PlanPage');
        //this.currency='usd';
        this.tipo = 'mensual';
        /// this.planss();
    };
    PlanPage1.prototype.ionViewWillEnter = function () {
        this.planss();
    };
    PlanPage1.prototype.planss = function () {
        var _this = this;
        //alert("si");
        var loader = this.loading.create({
            content: 'Enviando...',
        });
        var headers = new Headers();
        headers.append("Accept", 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        //var data={};
        loader.present()
            .then(function () {
            _this.http.get(url + '/plans', options)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                loader.dismiss();
                console.log(res);
                _this.planes = res.plans;
                _this.currencyUser = res.currency;
                _this.divisas = res.divisa;
                // console.log(this.currencyUser);
                // console.log(this.divisas);
                //this.currenciesuser=res.currency.selcurrencyiso;
                _this.planx = [];
                // console.log(this.currencyUser);
                _this.pagos(0, _this.currencyUser);
                _this.tipo = 0;
            });
        });
    };
    PlanPage1.prototype.onSelectChange = function (selectedValue) {
        //console.log('Selected', selectedValue);
        for (var _i = 0, _a = this.divisas; _i < _a.length; _i++) {
            var divisa = _a[_i];
            if (divisa.iso_code == selectedValue) {
                /*
                console.log(divisa.country_name);
                console.log(divisa.iso_code);
                console.log(divisa.symbol);*/
                //this.currencyUser={};
                this.currencyUser1 = [];
                var data = { "selcurrency": "9", "selcurrencyiso": divisa.iso_code, "selsymbol": divisa.symbol, "country": divisa.country_name };
                this.currencyUser = data;
                // console.log(divisa.selcurrency);
                /*
                 console.log(divisa.iso_code);
                 console.log(divisa.selcurrencyiso);
                 console.log(divisa.selsymbol);
                 console.log(divisa.country);
                 */
                //return;
            }
        }
        console.log(this.currencyUser);
        this.pagos(this.tipo, this.currencyUser);
        // console.log(this.tipo);
        //console.log(this.currencyUser);
    };
    PlanPage1.prototype.suscribe = function (idPlan, idplanStripe, nombre, precio, currency) {
        //alert(idplanStripe);
        //lista=[];
        //console.log(nombre);
        //lista={"idPlan":idPlan,"idplanStripe":idplanStripe}
        //{"idPlan":idPlan,"idplanStripe":idplanStripe,"nombre":nombre}
        //item
        this.item = { idPlan: idPlan, idplanStripe: idplanStripe, nombre: nombre, precio: precio, currency: currency };
        //console.log(this.item);
        this.navCtrl.push(SucribePage, { item: this.item });
    };
    PlanPage1.prototype.pagos = function (id, currencyUser) {
        console.log("pagos");
        console.log(currencyUser);
        this.planx = [];
        for (var _i = 0, _a = this.planes[id]; _i < _a.length; _i++) {
            var data = _a[_i];
            console.log("extras");
            console.log(data.extras);
            for (var _b = 0, _c = data.precios; _b < _c.length; _b++) {
                var precio = _c[_b];
                var min = currencyUser.selcurrencyiso;
                var mini = min.toLowerCase();
                if (precio.currency == mini) {
                    console.log("if");
                    var str = currencyUser.selcurrencyiso;
                    this.currency = str.toUpperCase();
                    // console.log(precio.currency);
                    var x = precio.currency;
                    this.curr = x.toUpperCase();
                    this.id_plan_stripe = precio.id_plan_stripe;
                    if ((this.curr == 'CLP') || (this.curr == 'PYG')) {
                        this.preciosx = precio.precio;
                        //this.preciosx=precio.precio;
                        this.precioss = this.preciosx / 12;
                    }
                    else {
                        this.preciosx = precio.precio / 100;
                        //this.preciosx=precio.precio;
                        this.precioss = this.preciosx / 12;
                    }
                    //break;
                }
            }
            var datos = {
                'nombre': data.plann,
                'idPlan': data.id,
                'idPlanstripe': this.id_plan_stripe,
                'precio': Number(this.precioss.toFixed(2)),
                'currency': this.curr,
                'isoCode': currencyUser.selsymbol,
                'country': currencyUser.country,
                'extras': data.extras,
                'preciox': this.preciosx,
            };
            this.planx.push(datos);
            //this.planx.push(datos);
        }
        console.log(this.planx);
    };
    PlanPage1.prototype.update = function (id) {
        this.pagos(id, this.currencyUser);
        //console.log(id);
    };
    PlanPage1 = __decorate([
        Component({
            selector: 'page-plan',
            templateUrl: 'plan.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            Http])
    ], PlanPage1);
    return PlanPage1;
}());
export { PlanPage1 };
//# sourceMappingURL=plan.js.map