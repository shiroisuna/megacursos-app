import { Component } from '@angular/core';
//import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
//import { CursosPage } from '../cursos/cursos';
import { MegatestPage } from '../megatest/megatest';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PlanPage1 } from '../plan/plan';
import { MegacursosPage } from '../megacursos/megacursos';
import { GrupoPage } from '../grupo/grupo';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = PlanPage1;
  tab3Root = ContactPage;
  //tab4Root = CursosPage;
  tab5Root = MegatestPage;
  tab6Root = MegacursosPage;
  tab7Root = GrupoPage;
  constructor(public navCtrl: NavController) {
}

 ionViewDidLoad() {
  // if (window.localStorage.getItem("isLogin")) {

  //  } else{

  // this.navCtrl.setRoot(LoginPage);
  // }
  }


}
	//0294-3453639
