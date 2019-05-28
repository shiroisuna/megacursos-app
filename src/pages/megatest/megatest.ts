import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MegatestDetalle } from '../detalles-megates/detalles-megates';
import { PopovermegatestComponent } from '../../components/popovermegatest/popovermegatest';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-megatest',
  templateUrl: 'megatest.html',
})
export class MegatestPage {
  planes: any;
  id_user;
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public popoverCtrl: PopoverController) {
  }
  ionViewDidLoad() {
    var data = JSON.parse(window.localStorage.getItem("isLogin"));
    this.id_user = data.datos.id;
    console.log(this.id_user);
    // this.megatest();
  }
  menuMegatest(myEvent, curso) {
    let popover = this.popoverCtrl.create(PopovermegatestComponent, { item: curso });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(i => {
      console.log(i);
      //console.log(curso);
      this.item = { curso: curso };
      //console.log(this.item);
      this.navCtrl.push(MegatestDetalle, { item: this.item });
    })
  }
  ionViewWillEnter() {
    //console.log(this.navCtrl);
    console.log("si");
    this.megatest();
  }
  megatest() {
    /*
      let loader = this.loading.create({
        content: 'Enviando...',
        });*/
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    this.http.get('http://mega.com/api/users/curso/' + this.id_user, options)
      .map(res => res.json())
      .subscribe(res => {
        //loader.dismiss();
        this.planes = res;
        //console.log(res);

        //});
      });
  }
  iniciar(curso) {
    //console.log(curso);
    this.item = { curso: curso };
    console.log(this.item);
    this.navCtrl.push(MegatestDetalle, { item: this.item });
  }
  detalles(curso) {
  //  console.log(curso);
  }

}
