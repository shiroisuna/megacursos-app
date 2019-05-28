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
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var PopoverComponent = /** @class */ (function () {
    function PopoverComponent(navParams, viewctrl) {
        this.navParams = navParams;
        this.viewctrl = viewctrl;
        console.log('Hello PopoverComponent Component');
        this.text = 'Hello World';
        var x = this.navParams.data.item;
        this.modulos = this.navParams.data.item;
        console.log(this.modulos);
        console.log(x);
    }
    PopoverComponent.prototype.enviar = function (i) {
        var x = i;
        this.viewctrl.dismiss(x);
        //console.log(x)
    };
    PopoverComponent = __decorate([
        Component({
            selector: 'popover',
            templateUrl: 'popover.html'
        }),
        __metadata("design:paramtypes", [NavParams, ViewController])
    ], PopoverComponent);
    return PopoverComponent;
}());
export { PopoverComponent };
//# sourceMappingURL=popover.js.map