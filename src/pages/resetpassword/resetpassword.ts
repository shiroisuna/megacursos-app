import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../../providers/global/global';
let url = SERVER_URL;
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  @ViewChild('email') email;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }
  close() {
    this.navCtrl.pop();//cierro el nabvar detalles
    //alert("close");
  }
  resetPassword() {
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    //let emaill=this.email.value;
    //password: ""+this.password.value+""
    //}
    let data = {
      email: "" + this.email.value + "",
      //password: ""+this.password.value+""
    }
    this.http.post(url + '/users/forgotpassword', data, options)

      .map(res => res.json())
      .subscribe(res => {
        //loader.dismiss();
        console.log(res);
        if (res.response == 'true') {
          let alert = this.alertCtrl.create({
            title: "Genial.!",
            subTitle: "Cambio de Clave satisfatorio, por favor revise su email e inicie sessión",
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();//this.close();

        }//end if
        else {
          //console.log("mal");
          let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: "El email no se encuentra registrado",
            buttons: ['OK']
          });
          alert.present();
        }
      });

  }

}
