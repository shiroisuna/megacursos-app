import { Component } from '@angular/core';
import { NavController, Nav, Tabs, MenuController, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { MegacursosPage } from '../megacursos/megacursos';
import { AsistenciaPage } from '../asistencia/asistencia';
import { RecientesPage } from '../recientes/recientes';
import { SERVER_URL } from '../../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { NetworkInterface } from '@ionic-native/network-interface';
let url = SERVER_URL;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab: Tabs;

  html;

  parrafo;

  idUser: number;

  total;

  url;

  blogs;

  plan;

  extra;

  reciente: any = [];
  width: number;
  height: number;
  public dailyUseItems: any[];

  //reci:any[] = [];
  constructor(public navCtrl: NavController,
    public nav: Nav,
    public menuCtrl: MenuController,
    public http: Http,
    public alertCtrl: AlertController,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    //public platform:Platform
  ) {
    this.html = "<h1>probando</h1><h2>probando</h2>";
    this.tab = this.navCtrl.parent;
    this.parrafo = "Bienvenidos todos los diseñadores gráficos al Megaconcurso Ecológico patrocinado por Megacursos, todos los diseñadores .......";

    var data = JSON.parse(window.localStorage.getItem("isLogin"));
    if (data) {
      this.idUser = data.datos.id;
    }
    /*
        platform.ready().then(() => {
            this.width = platform.width();
            this.height = platform.height();
        });
        */
  }

  ionViewWillEnter() {
    this.recientes();
    this.homeplan();
    //console.log(this.width);
  }
  homeplan(){

    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');
    let options = new RequestOptions({ headers: headers });
    this.http.get(url + '/users/homeplan/' + this.idUser, options)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.plan=res.plan;
        this.extra=res.extras;

      },
        (Error => { console.log("error") })
      );

  }

  recientes() {
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');
    let options = new RequestOptions({ headers: headers });
    this.http.get(url + '/users/getrecientes/' + this.idUser, options)
      .map(res => res.json())
      .subscribe(res => {
        //console.log(res);
        // this.total=12;
        this.reciente = res.recientes;
        this.url = res.url;
        this.blogs = res.blog;
        //  console.log('aqio');
        //  console.log(this.blogs);
        if (res.recientes == null) {
          this.total = 0;
          // console.log("null");
        }
        else {
          this.total = this.reciente.length;
          // console.log("nonull");
        }
      },
        (Error => { console.log("error") })
      );

  }

  openPage(page) {
    this.tab.select(page);
  }

  allCourses() {
    this.tab.select(2);
  }

  getRecientes(idChapter, idCurso) {

    let loader = this.loading.create({
      content: 'Validando...',
    });

    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');
    let options = new RequestOptions({ headers: headers });
    let data = {
      idChapter: ""+idChapter+"",
      idCurso: "" + idCurso + "",
      idUser: "" + this.idUser + ""
    }
    loader.present()
      .then(() => {
        this.http.post(url + '/users/validarecientenew', data, options)
          .map(res => res.json())
          .subscribe(res => {
            loader.dismiss();
            if (res.autorice == "true") {
              this.navCtrl.push(RecientesPage, { idChapter: idChapter, idCurso: idCurso });
            }
            else {
              let alert = this.alertCtrl.create({
                title: "Acceso restringido",
                subTitle: "No tiene permiso para acceder al curso, por favor valide su plan.",
                buttons: ['OK']
              });
              alert.present()
            }
          });
      });
  }
  asistencia(){
    console.log(this.extra);
    if (this.plan.nombre == "Gratis") {
      let toast = this.toastCtrl.create({
        message: 'Ahora no tienes acceso a asistencia 24h.Sube de plan para poder obtener asistencia individual.',
        duration: 2000,
        position: 'middle',
        cssClass: "toast-success"
      });
      toast.present();
    }
    else {
      //  console.log("si");
      let total = this.extra.length;
      if (total == 0) {
        let alert = this.alertCtrl.create({
          title: "Alerta",
          subTitle: "Este plan no poseeAsistencia individual 24h. Sube de plan. ",
          buttons: ['OK']
        });
        alert.present();
      }
      else {
        let bandera = "false";
        for (let extra of this.extra) {
        //  console.log("verificar evaluacion");
          if (extra.title == "Asistencia Individual") {

            bandera = "true";
            break;
          }
          //console.log(extra);
        }
        if (bandera == "true") {
          //console.log("si tiene diploma oficial");
          this.miAsistencia();
        } else {
          let alert = this.alertCtrl.create({
            title: "Alerta",
            subTitle: "Este plan no posee Asistencia Individual. Sube de plan para obtener atención 24h ",
            buttons: ['OK']
          });
          alert.present();
        }

      }
    }
  }
  miAsistencia(){
    let idU = this.idUser;
    let idP = 11;//no esta en funcionamiento es para completar
    let loader = this.loading.create({
      content: 'Verificando...',
    });
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');
    let options = new RequestOptions({ headers: headers });
    //var data={};
    loader.present()
      .then(() => {
        this.http.get(url + '/users/miasistencia/' + idU + "/" + idP, options)
          .map(res => res.json())
          .subscribe(res => {
            loader.dismiss();
            if (res.autorice == "false") {
              let alert = this.alertCtrl.create({
                title: "Alerta",
                subTitle: "No tiene un plan activo por favor valide su plan y disfrute de asistencia individual 24h",
                buttons: ['OK']
              });
              alert.present();
            }
            if (res.autorice == "true") {
              console.log("si");
              this.navCtrl.push(AsistenciaPage);
            }
          });
      });
  //  console.log("si");
  }
  examen() {
    //console.log(this.extra);
    if (this.plan.nombre == "Gratis") {
      let toast = this.toastCtrl.create({
        message: 'Ahora no tienes acceso a evaluaciones oficiales.Sube de plan para poder realizar evaluaciones.',
        duration: 3000,
        position: 'middle',
        cssClass: "toast-success"
      });
      toast.present();
    }
    else {
      //  console.log("si");
      let total = this.extra.length;
      if (total == 0) {
        let alert = this.alertCtrl.create({
          title: "Alerta",
          subTitle: "Este plan no posee Evaluación Oficial. Sube de plan. ",
          buttons: ['OK']
        });
        alert.present()
      }
      else {
        let bandera = "false";
        for (let extra of this.extra) {
          console.log("verificar evaluacion");
          if (extra.title == "Evaluación Oficial") {
            bandera = "true";

            break;
          }
        }
        if (bandera == "true") {
          this.evaluacion();
        } else {
          let alert = this.alertCtrl.create({
            title: "Alerta",
            subTitle: "Este plan no posee Evaluación Oficial. Sube de plan. ",
            buttons: ['OK']
          });
          alert.present();

        }
      }

      //console.log(total);

    }
  }
  evaluacion() {
  //  console.log("aqui ecxamen");
    //return;
  //  console.log(product);
  let alert = this.alertCtrl.create({
    title: "Alerta",
    subTitle: "Completa un megacurso completo y demuestra tus conocomientos  ",
    buttons: ['OK']
  });
  alert.present();

  }

  diploma() {
    console.log("diploma");
    if (this.plan.nombre == "Gratis") {
      let toast = this.toastCtrl.create({
        message: 'Ahora no tienes acceso a diplomas oficiales.Sube de plan para poder obtener tu diploma oficial.',
        duration: 2000,
        position: 'middle',
        cssClass: "toast-success"
      });
      toast.present();
    }
    else {
      //  console.log("si");
      let total = this.extra.length;
      if (total == 0) {
        let alert = this.alertCtrl.create({
          title: "Alerta",
          subTitle: "Este plan no posee Diploma Oficial. Sube de plan. ",
          buttons: ['OK']
        });
        alert.present();
      }
      else {
        let bandera = "false";
        for (let extra of this.extra) {
        //  console.log("verificar evaluacion");
          if (extra.title == "Diploma Oficial") {

            bandera = "true";
            break;
          }
          //console.log(extra);
        }
        console.log(bandera);
        if (bandera == "true") {
          //console.log("si");
          let alert = this.alertCtrl.create({
            title: "Alerta",
            subTitle: "Completa un Megatest y obten tu diploma oficial",
            buttons: ['OK']
          });
            alert.present();
          //console.log("si tiene diploma oficial");
          //this.miDiploma(this.producto.produc);
        } else {
          let alert = this.alertCtrl.create({
            title: "Alerta",
            subTitle: "Este plan no posee Diploma Oficial. Sube de plan. ",
            buttons: ['OK']
          });
          alert.present();
        }

      }
    }
  }
}
