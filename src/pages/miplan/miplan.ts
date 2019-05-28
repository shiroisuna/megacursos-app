import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import {Http, Headers,RequestOptions}  from '@angular/http';
import {SERVER_URL} from '../../providers/global/global';
import { PlanPage1 } from '../plan/plan';
let url = SERVER_URL;

/**
 * Generated class for the MiplanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-miplan',
  templateUrl: 'miplan.html',
})
export class MiplanPage {
idUsuario;
planes:any={"tipo":'nada'};
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public http:Http,
  	public alertCtrl:AlertController ) {
  	this.idUsuario=navParams.data.idUser;
  }

ionViewWillEnter(){
	//this.planes=
	this.miplan();

}

cancelar(plan){
	console.log(plan);
	const confirm = this.alertCtrl.create({
      title: 'Atención',
      message: 'esta seguro que desea cancelar su suscripción?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            ///console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
miplan(){
//	console.log(this.idUsuario+"ss");
	let idUsuario=this.idUsuario;
	 var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
      this.http.get(url+'/miplan/'+idUsuario,options)
      .map(res => res.json())
      .subscribe(res => {
      	this.planes=res;
        //console.log(res);
        },
        error => { console.log("soo")}
      );
}
 subePlan(){
  	console.log("subePlan");
  	this.navCtrl.push(PlanPage1);
  }

}
