var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ExamenPage } from '../pages/examen/examen';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { CursosPage } from '../pages/cursos/cursos';
import { PlayPage } from '../pages/play/play';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { RegisterPage } from '../pages/register/register';
import { ConfigPage } from '../pages/config/config';
import { MegacursosPage } from '../pages/megacursos/megacursos';
// ------------ Aca esta mi import JAMP
import { GrupoPage } from '../pages/grupo/grupo';
import { CommentsPage } from '../pages/comments/comments';
// ------------ Aca esta mi import JAMP
import { MegatestPage } from '../pages/megatest/megatest';
import { MiplanPage } from '../pages/miplan/miplan';
import { ReproductorPage } from '../pages/reproductor/reproductor';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProductPage } from '../pages/product/product';
import { SucribePage } from '../pages/paysuscripage/paysuscripage';
import { PlanPage1 } from '../pages/plan/plan';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { HttpClientModule } from '@angular/common/http';//esta
import { HttpModule } from '@angular/http';
import { AuthProvider } from '../providers/auth/auth'; //esta
import { ProgressBarModule } from 'angular-progress-bar';
//import { KSSwiperModule } from 'angular2-swiper';
import { PopoverComponent } from '../components/popover/popover';
import { ContactComponent } from '../components/contact/contact';
//import { AccordionListComponent } from '../components/accordion-list/accordion-list';
import { PopovermegatestComponent } from '../components/popovermegatest/popovermegatest';
import { MegatestDetalle } from '../pages/detalles-megates/detalles-megates';
import { RecientesPage } from '../pages/recientes/recientes';

 // { ComponentsExpandableComponent } from '../components/components-expandable/components-expandable';

//Simport { NetworkInterface } from '@ionic-native/network-interface';
//import { GlobalProvider } from '../providers/global/global';
import { Stripe } from '@ionic-native/stripe';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                AboutPage,
                ContactPage,
                HomePage,
                CursosPage,
                MegatestPage,
                TabsPage,
                LoginPage,
                SucribePage,
                ReproductorPage,
                PopoverComponent,
                PopovermegatestComponent,
                ContactComponent,
                MiplanPage,
                // AccordionListComponent,
                // ProgressBarComponent,
                MegatestDetalle,
                RegisterPage,
                MegacursosPage,
                GrupoPage,
                CommentsPage,
                ProductPage,
                PlayPage,
                PlanPage1,
                ResetpasswordPage,
                ConfigPage,
                ExamenPage,
                RecientesPage
            ],
            imports: [
                BrowserModule,
                HttpModule,
                IonicModule.forRoot(MyApp),
                ProgressBarModule,
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                // AccordionListComponent,
                AboutPage,
                ContactPage,
                ConfigPage,
                CursosPage,
                ExamenPage,
                HomePage,
                LoginPage,
                MyApp,
                MegatestPage,
                MegatestDetalle,
                MegacursosPage,
                PlayPage,
                PlanPage1,
                PopoverComponent,
                PopovermegatestComponent,
                ContactComponent,
                MiplanPage,
                ProductPage,
                ReproductorPage,
                ResetpasswordPage,
                RegisterPage,
                SucribePage,
                TabsPage,
                RecientesPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                Stripe,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                AuthProvider,
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map