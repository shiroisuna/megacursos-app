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
//import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CursosPage } from '../cursos/cursos';
import { MegatestPage } from '../megatest/megatest';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PlanPage1 } from '../plan/plan';
import { MegacursosPage } from '../megacursos/megacursos';
var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.tab1Root = HomePage;
        this.tab2Root = PlanPage1;
        this.tab3Root = ContactPage;
        this.tab4Root = CursosPage;
        this.tab5Root = MegatestPage;
        this.tab6Root = MegacursosPage;
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        if (window.localStorage.getItem("isLogin")) {
        }
        else {
            this.navCtrl.setRoot(LoginPage);
        }
    };
    TabsPage = __decorate([
        Component({
            templateUrl: 'tabs.html'
        }),
        __metadata("design:paramtypes", [NavController])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//0294-3453639
//# sourceMappingURL=tabs.js.map