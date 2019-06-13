import { Component, NgModule } from '@angular/core';
import { NavController, Nav, Tabs, MenuController, ModalController, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { MegacursosPage } from '../megacursos/megacursos';
import { AsistenciaPage } from '../asistencia/asistencia';
import { RecientesPage } from '../recientes/recientes';
import { SERVER_URL } from '../../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommentsPage } from '../comments/comments';
import { ProfilePage } from '../profile/profile';
import { ModalPublicPage } from '../modal-public/modal-public';
// import { StartPage } from 'start'

// import { ComponentsExpandableComponent } from "../../components/components-expandable/components-expandable";

let url = SERVER_URL;

@Component({
	selector: 'page-grupo',
  	templateUrl: 'grupo.html'
})


export class GrupoPage {

	constructor(
		public navCtrl: NavController, 
		public modalCtrl: ModalController, 
		private http: Http
		){}

	goToCommentPage(){

		this.navCtrl.push(CommentsPage)
	}



	goToProfilePage(){

		this.navCtrl.push(ProfilePage)
	}

	async showModalPublic(){

		const modal = this.modalCtrl.create('ModalPublicPage');

		await modal.present();

	}

	prueba(){
		 
		var headers = new Headers();
	    headers.append('Accept', 'application/json');
	    headers.append('Content-Type', 'application/json');
	    headers.append('Access-Control-Allow-Credentials', 'true');
	    headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');
	    let options = new RequestOptions({ headers: headers });
	    this.http.get(url + '/posts', options)
	      .map(res => res.json())
	      .subscribe(res => {
	        console.log(res);
	        // this.total=12;
	        // this.user = res.login;
	        // this.email = res.email;
	        // this.blogs = res.blog;
	        //  console.log('aqio');
	        //  console.log(this.blogs);
	        // if (res.recientes == null) {
	        //   this.total = 0;
	        //   // console.log("null");
	        // }
	        // else {
	        //   this.total = this.reciente.length;
	        //   // console.log("nonull");
	        // }
	      },
	        (Error => { console.log("error") })
	      );
	}


	ionViewDidLoad() {
	    this.prueba();
	}

}