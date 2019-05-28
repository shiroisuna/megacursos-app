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
import { NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the PopovermegatestComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PopovermegatestComponent = /** @class */ (function () {
    function PopovermegatestComponent(navParams, viewctrl) {
        this.navParams = navParams;
        this.viewctrl = viewctrl;
        console.log('Hello PopovermegatestComponent Component');
        this.text = 'Hello World';
        this.modulos = this.navParams.data.item;
        console.log(this.modulos);
    }
    PopovermegatestComponent.prototype.enviar = function () {
        var x = 1;
        this.viewctrl.dismiss(x);
        //console.log(x)
    };
    PopovermegatestComponent = __decorate([
        Component({
            selector: 'popovermegatest',
            templateUrl: 'popovermegatest.html'
        }),
        __metadata("design:paramtypes", [NavParams, ViewController])
    ], PopovermegatestComponent);
    return PopovermegatestComponent;
}());
export { PopovermegatestComponent };
//# sourceMappingURL=popovermegatest.js.map