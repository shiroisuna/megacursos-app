import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ExamenPage } from '../pages/examen/examen';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { PlayPage } from '../pages/play/play';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { RegisterPage } from '../pages/register/register';
import { MegacursosPage } from '../pages/megacursos/megacursos';
// ------------ Aca esta mi import JAMP
import { GrupoPage } from '../pages/grupo/grupo';
import { CommentsPage } from '../pages/comments/comments';
import { ProfilePage } from '../pages/profile/profile';
// import { ModalPublicPage } from '../pages/modal-public/modal-public';
// ------------ Aca esta mi import JAMP
import { AsistenciaPage } from '../pages/asistencia/asistencia';
import { MegatestPage } from '../pages/megatest/megatest';
import { MiplanPage } from '../pages/miplan/miplan';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProductPage } from '../pages/product/product';
import { PlanPage1 } from '../pages/plan/plan';
import { DatospPage } from '../pages/datosp/datosp';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { HttpClientModule } from '@angular/common/http';//esta
import { HttpModule } from '@angular/http';
import { ProgressBarModule } from 'angular-progress-bar';
import { PopoverComponent } from '../components/popover/popover';
import { ContactComponent } from '../components/contact/contact';
import { PopovermegatestComponent } from '../components/popovermegatest/popovermegatest';
import { RecienteComponent } from '../components/reciente/reciente';
import { MegatestDetalle } from '../pages/detalles-megates/detalles-megates';
import { RecientesPage } from '../pages/recientes/recientes';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';


//Plugins JAMP Created 06-06-2018

import { ImagePicker } from '@ionic-native/image-picker';

// import { ComponentsExpandableComponent } from "../components/components-expandable/components-expandable";


@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    MegatestPage,
    TabsPage,
    LoginPage,
    PopoverComponent,
    PopovermegatestComponent,
    RecienteComponent,
    ContactComponent,
    MiplanPage,
    AsistenciaPage,
    MegatestDetalle,
    RegisterPage,
    MegacursosPage,
    GrupoPage,
    CommentsPage,
    ProfilePage,
    // ModalPublicPage,
    ProductPage,
    PlayPage,
    PlanPage1,
    ResetpasswordPage,
    ExamenPage,
    RecientesPage,
    DatospPage,
    // ComponentsExpandableComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ProgressBarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ContactPage,
    ExamenPage,
    HomePage,
    LoginPage,
    MyApp,
    MegatestPage,
    MegatestDetalle,
    MegacursosPage,
    GrupoPage,
    CommentsPage,
    ProfilePage,
    // ModalPublicPage,
    PlayPage,
    PlanPage1,
    PopoverComponent,
    PopovermegatestComponent,
    RecienteComponent,
    ContactComponent,
    MiplanPage,
    ProductPage,
    AsistenciaPage,
    ResetpasswordPage,
    RegisterPage,
    TabsPage,
    RecientesPage,
    DatospPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ImagePicker,
    InAppPurchase2,
    Push,
  ]
})
export class AppModule { }
