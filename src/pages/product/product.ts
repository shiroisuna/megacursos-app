import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Slides, Content, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from '../../providers/global/global';
import 'rxjs/add/operator/map';
import { PlayPage } from '../play/play';
import { ExamenPage } from '../examen/examen';
import { AsistenciaPage } from '../asistencia/asistencia';
//import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
//import { } from 'ionic-angular';
let url = SERVER_URL;
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  extra: any;
  producto: any;
  imagen: any;
  temario: any;
  sliders: any;
  idUser;
  plan;
  descripcion: string;
  direccion;
  hora;
  descripcionDiv;
  buttonClicked: boolean = false;
  nombreBoton;
  puntos;
  interval;
  @ViewChild('pageTop') pageTop: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
  //  private photoViewer: PhotoViewer,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loading: LoadingController) {
    this.producto = navParams.data.item.producto;
    this.imagen = navParams.data.item.imagen;
    this.plan = navParams.data.item.plan;
    this.extra = navParams.data.item.extra;
    //console.log(this.producto);
    //console.log("aqui plan");
    //console.log(this.plan);
    var data = JSON.parse(window.localStorage.getItem("isLogin"));
    this.idUser = data.datos.id;
    this.nombreBoton = "más";
    this.puntos = "...";

  }

  ionViewWillEnter() {
    this.megacursos();
  }

  onButtonClick() {
    this.buttonClicked = !this.buttonClicked;

    if (this.buttonClicked == true) {
      this.descripcionDiv = this.descripcion;
      this.nombreBoton = "menos";
      this.puntos = "";

    }
    else {
      this.descripcionDiv = this.descripcion.substr(0, 350);
      this.nombreBoton = "más";
      this.puntos = "......";
    }

  //  console.log(this.buttonClicked);
  }

  tema(element: string) {
    //console.log("tema");
    let yOffset = document.getElementById('temario').offsetTop;
    this.pageTop.scrollTo(0, yOffset, 3000)
  }

  megacursos() {
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    this.http.get(url + '/plans/curso/' + this.idUser + "/" + this.producto.produc.id, options)
      .map(res => res.json())
      .subscribe(res => {
        this.temario = res.chapter;
        this.sliders = res.sliders;
        this.direccion = res.direccion;
        this.descripcion = res.descripcion;
        this.descripcionDiv = this.descripcion.substr(0, 350);
        this.hora = res.hora;
      });
  }
  toggleSection(i) {
    this.temario[i].open = !this.temario[i].open;
  }
  toggleItem(i, j) {
    this.temario[i].videos[j].open = !this.temario[i].videos[j].open;
  }
  play(video, tema, i) {
    console.log(video);
    let loader = this.loading.create({
      content: '...',
    });
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let idChapter=video.id_video;
    let ver=video.gratis;
    let orden=video.orden;

    let data = {
    //  numero:""+orden+"",
      idChapter: ""+idChapter+"",
      //opcion: ""+ver+"",
      idCurso: "" + this.producto.produc.id + "",
      idUser: "" + this.idUser + ""
    }
    loader.present()
      .then(() => {
        this.http.post(url + '/users/validarecientenew', data, options)
          .map(res => res.json())
          .subscribe(res => {
            loader.dismiss();
            if (res.autorice == "true") {
              let plan = this.plan;
              let idCurso = this.producto.produc.id;
              let idChapter = tema.videos[i - 1].id_video;
              let licencia = this.producto.produc.licencia;

              //console.log();
              this.navCtrl.push(PlayPage, { idChapter: idChapter, idCurso: idCurso, plan: plan, licencia: licencia });
            }
            else {

              let alert = this.alertCtrl.create({
                title: "Acceso restringido",
                subTitle: "NO tiene permiso para acceder al curso, por favor valide su plan.",
                buttons: ['OK']
              });
              alert.present()
            }
          });
      });
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
          this.evaluacion(this.producto.produc);
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
  evaluacion(product) {
  //  console.log("aqui ecxamen");
    //console.log(product);

    let idU = this.idUser;
    let idP = product.id;
    let loader = this.loading.create({
      content: 'Verificando...',
    });
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    //var data={};
    loader.present()
      .then(() => {
        this.http.get(url + '/users/evaluacion/' + idU + "/" + idP, options)
          .map(res => res.json())
          .subscribe(res => {
            loader.dismiss();
            if (res.disponible == "false") {
              let alert = this.alertCtrl.create({
                title: "Alerta",
                subTitle: "Para realizar el Megatest Oficial debes completar todos los videos. ",
                buttons: ['OK']
              });
              alert.present();

            }
            if (res.disponible == "true") {
              let producto = this.producto;
              //console.log(producto);
              this.navCtrl.push(ExamenPage, { producto: producto });
            }
          });
      });

  }
  diploma() {
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
        if (bandera == "true") {
          console.log("si tiene diploma oficial");
          this.miDiploma(this.producto.produc);
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
        subTitle: "Este plan no posee Diploma Oficial. Sube de plan. ",
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
        this.miAsistencia(this.producto.produc);
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
miAsistencia(product){
  let idU = this.idUser;
  let idP = product.id;
  let loader = this.loading.create({
    content: 'Verificando...',
  });
  var headers = new Headers();
  headers.append("Accept", 'application/x-www-form-urlencoded');
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
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
  miDiploma(product) {
    //  console.log("diploma");
    //  console.log(product);
    let idU = this.idUser;
    let idP = product.id;
    let loader = this.loading.create({
      content: 'Verificando...',
    });
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    //var data={};
    loader.present()
      .then(() => {
        this.http.get(url + '/users/midiploma/' + idU + "/" + idP, options)
          .map(res => res.json())
          .subscribe(res => {
            loader.dismiss();
            if (res.disponible == "false") {
              let alert = this.alertCtrl.create({
                title: "Alerta",
                subTitle: "No existe megatest aprobado para este megacursos. ",
                buttons: ['OK']
              });
              alert.present();
            }
            if (res.disponible == "true") {
              let alert = this.alertCtrl.create({
                title: "Alerta",
                subTitle: "verifique su información para el envio de su Diploma Oficial. ",
                buttons: ['OK']
              });
              alert.present();
              /*
              let producto = this.producto;
              console.log(producto);
              this.navCtrl.push(ExamenPage, { producto: producto });
              */
            }
          });
      });
  }

  slidesDidLoad(slides: Slides) {
    slides.startAutoplay();
  }


}
