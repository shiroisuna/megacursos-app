import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from '../../providers/global/global';
import { MegatestDetalle } from '../detalles-megates/detalles-megates';
//import { PopoverComponent } from '../components/popover/popover';
//import { AccordionListComponent } from '../components/accordion-list/accordion-list';
import 'rxjs/add/operator/map';
let url = SERVER_URL;

@Component({
  selector: 'page-examen',
  templateUrl: 'examen.html',
})
export class ExamenPage {
  producto;
  idUser;
  examenes;
  item;
  curso;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {
    this.producto = navParams.data.producto;
    var data = JSON.parse(window.localStorage.getItem("isLogin"));
    this.idUser = data.datos.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Examen');
    console.log(this.producto);
  }

  ionViewWillEnter() {
    this.megatest();
  }

  megatest() {
    //console.log(this.producto.produc.id+"-"+this.idUser);
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    this.http.get(url + '/users/examen/' + this.idUser + "/" + this.producto.produc.id, options)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        //loader.dismiss();
        this.examenes = res.examen;
        console.log(this.examenes);
      });
  }

  nuevoTest() {
    this.item = { curso: this.producto.produc.id };
    //console.log(this.item);
    this.navCtrl.push(MegatestDetalle, { item: this.item });
  }

}
