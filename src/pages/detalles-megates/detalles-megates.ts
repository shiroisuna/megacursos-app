import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../../providers/global/global';
let url = SERVER_URL;
@Component({
  selector: 'page-detalles-megates',
  templateUrl: 'detalles-megates.html',
})
export class MegatestDetalle {
  curso: any = {};
  id_user;
  test;
  preguntas: any = {};
  result;
  idMegatest;
  interval;
  restante;
  visible;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public toastCtrl: ToastController) {
    this.curso = navParams.data.item.curso;

  }

  ionViewDidLoad() {
    console.log('detalles');
    console.log(this.curso);
    var data = JSON.parse(window.localStorage.getItem("isLogin"));
    this.id_user = data.datos.id;
  }

  ionViewWillEnter() {
    this.iniciar();
    this.contadorr();

  }

  comprobar(idrespuesta) {
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    this.http.get(url + '/users/megatest_comprobar/' + this.preguntas.id_pregunta + "/" + idrespuesta + "/" + this.preguntas.id_megatest + "/" + this.preguntas.id_curso, options)
      .map(res => res.json())
      .subscribe(res => {
        //loader.dismiss();
        console.log(res);
        //this.result=res.response;
        if (res.response.mensaje == "true") {
          //presentToast() {
          let toast = this.toastCtrl.create({
            message: 'Respuesta Correcta',
            duration: 2000,
            position: 'bottom',
            cssClass: "toast-success"
          });
          toast.present();

          //console.log("si");
          //this.preguntas=res.response;
          //console.log(this.preguntas);
        }
        if (res.response.mensaje == "false") {

          let toast = this.toastCtrl.create({
            message: 'Respuesta Incorrecta',
            duration: 2000,
            position: 'bottom',
            cssClass: "toast-success"
          });
          toast.present();

          //console.log("no");
          //this.preguntas=res.response;
          //console.log(this.preguntas);
        }
        this.iniciar();

        console.log("res");
        //});
      });
  }

  iniciar() {
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    this.http.get(url + '/users/megatestc/' + this.id_user + "/" + this.curso, options)
      .map(res => res.json())
      .subscribe(res => {
        //loader.dismiss();
        //this.test=res;
        this.visible = "true";
        if (res.code == 0) {
          this.preguntas = res.response;
          console.log(this.preguntas);
          //console.log("dddd"+);
          //this.idMegatest
          //console.log(this.preguntas.id_megatest);
          //console.log(this.preguntas.id_megatest);
          //this.contadorr(this.preguntas.id_megatest);
          this.idMegatest = res.response.id_megatest;
          //console.log("id"+this.idMegatest);
          window.localStorage.setItem("idmegatest", this.idMegatest);
        }
        if (res.code == 10) {
          console.log("fin megatest");
          clearInterval(this.interval);

          if (res.response.status == "Aprobado") {
            //console.log("reprobado");
            let fin = this.toastCtrl.create({
              message: 'Megatest Aprobado, Nota Obtenida:' + res.response.nota + "%" + " Minimo para aprobar:" + res.response.nota_minima + "%/100%",
              //duration: 3000,
              position: 'middle',
              showCloseButton: true,
              closeButtonText: "ok",
              cssClass: "toast-success"
            });
            fin.onDidDismiss(() => {
              //console.log('fin toast');
              this.navCtrl.pop();//cierro el nabvar detalles
            });
            fin.present();
          }
          if (res.response.status == "Reprobado") {
            //console.log("reprobado");
            let fin = this.toastCtrl.create({
              message: 'Megatest Reprobado, Nota Obtenida:' + res.response.nota + "%" + " Minimo para aprobar:" + res.response.nota_minima + "%/100%",
              //duration: 3000,
              position: 'middle',
              showCloseButton: true,
              closeButtonText: "ok",
              cssClass: "toast-success"
            });
            fin.onDidDismiss(() => {
              //console.log('fin toast');
              this.navCtrl.pop();//cierro el nabvar detalles
            });
            fin.present();
          }
        }
        if (res.code == 30) {
          this.visible = "false";
          let fin = this.toastCtrl.create({
            message: res.mensaje + "." + res.motivo + "." + res.tiempo,
            //duration: 3000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: "ok",
            cssClass: "toast-success"
          });
          fin.onDidDismiss(() => {
            //console.log('fin toast');
            this.navCtrl.pop();//cierro el nabvar detalles
          });
          fin.present();
          //and (res.mensaje=="Penalizado")){
          //console.log("fin");

        }
        if (res.code == 20) {
          this.visible = "false";
          let fin = this.toastCtrl.create({
            message: res.mensaje + "." + res.motivo,
            //duration: 3000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: "ok",
            cssClass: "toast-success"
          });
          fin.onDidDismiss(() => {
            //console.log('fin toast');
            this.navCtrl.pop();//cierro el nabvar detalles
          });
          fin.present();
          //and (res.mensaje=="Penalizado")){
          //console.log("fin");

        }
      });
  }
  ionViewWillLeave() {
    clearInterval(this.interval);
    console.log("salir");
  }

  contadorr() {
    //alert(id);
    var y = this;

    var interval, a;
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    //var y=this;
    a = 0;
    this.interval = setInterval(function() {
      //var id=;
      var id = window.localStorage.getItem("idmegatest");
      console.log("ddddd" + id);
      y.http.get(url + '/users/megatest_transcurrido/' + id, options)
        .map(res => res.json())
        .subscribe(res => {
          if (res.code == "activo") {
            y.restante = res.restante;
          }
          if (res.code == "finTest") {
            //y.parar();
            //a=1;
            clearInterval(y.interval);
            console.log('fin');
          }
          //console.log(res);
        });
      //console.log(id);
    }

      , 2000);
  }
  parar() {
  	/*return (interval) => {
    console.log("inside the return of the observable");
    clearInterval(interval);
}*/
  //  alert("arar");
    clearInterval(this.interval);

  }
  /*
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });*/



}
