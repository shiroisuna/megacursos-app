import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SERVER_URL } from '../../providers/global/global';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
let url = SERVER_URL;
@Component({
  selector: 'page-asistencia',
  templateUrl: 'asistencia.html',
})
export class AsistenciaPage {
  codigo;
  idUser;
  constructor(
    public navCtrl: NavController,
    public http: Http,
    public navParams: NavParams) {
      var data = JSON.parse(window.localStorage.getItem("isLogin"));
      this.idUser = data.datos.id;
  }
  ionViewWillEnter() {
    //this.codigo="JHGHGHG20";
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let idU=this.idUser;
    this.http.get(url + '/users/getasistencia/' + idU, options)
      .map(res => res.json())
      .subscribe(res => {
        this.codigo=res.clave;
      });
  }

}
