
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, Content, AlertController, LoadingController, Tabs } from 'ionic-angular';
import { SERVER_URL } from '../../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PopoverComponent } from '../../components/popover/popover';
declare var jwplayer;
let url = SERVER_URL;
@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {
  idChapter;
  idCurso;
  idUsuario;
  modulos: any = [];
  idModulo: any = {};
  ultimaClase: any = {};
  moduloActual: any = {};
  status;
  interval;
  porcentajex;
  indexI;
  indexJ;
  info: any = {};
  playClase: any = {};
  plan: any = {};
  licencia;
  selection;
  tab: Tabs;
  @ViewChild('pageTop') pageTop: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public popoverCtrl: PopoverController,
  //  private events: Events,
    public alertCtrl: AlertController,
    public loading: LoadingController,
  ) {
    this.idChapter = navParams.data.idChapter;
    this.licencia = navParams.data.licencia;
    this.idCurso = navParams.data.idCurso;
    this.plan = navParams.data.plan;
    var data = JSON.parse(window.localStorage.getItem("isLogin"));
    this.idUsuario = data.datos.id;
    this.tab = this.navCtrl.parent;
  }
  scrollTo(element: string) {
    let yOffset = document.getElementById(element).offsetTop;
    this.pageTop.scrollTo(0, yOffset, 4000)
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.recientes();
  }

  recientes() {
    var bandera;
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    this.http.get(url + '/users/reciente/' + this.idChapter + '/' + this.idCurso + '/' + this.idUsuario, options)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.modulos = res.modulos;
        this.info = res.curso;
        //  console.log("aqui");
        console.log(this.info);
        this.idModulo = res.moduloActivo.part_no;
        var x;
        for (let modulo of this.modulos) {
          x = 0;
          if (modulo.id == this.idModulo) {
            this.moduloActual = modulo;
            console.log("aqui");
            bandera = true;
            break;
          }
          x++;
        }
        this.reproduccion(this.idChapter);
        this.indexI = x;
        console.log(this.moduloActual);
      });
  }

  reproduccion(idChapter) {
    let loader = this.loading.create({
      content: '...',
    });
    loader.present()
    var y;
    y = 0;
    clearInterval(this.interval);
    for (let clase of this.moduloActual.clases) {
      //console.log(clase.id);
      if (clase.id == idChapter) {
        this.playClase = clase;
        break;
      }
      y++;
    }
    this.getVideo(idChapter);
    this.indexJ = y;
    this.selection = y;
    console.log(this.playClase);
    //console.log(this.indexJ);
    loader.dismiss();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent, { item: this.modulos });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(i => {
      //console.log(i);
      if (i != null) {
        this.moduloActual = this.modulos[i];
        this.indexI = i;
      }
      console.log(this.indexI);
    })
  }
  mensaje(){
    let alert = this.alertCtrl.create({
      title: "Información",
      cssClass: 'custom-alert',
      subTitle: "Para descargar los archivos de proyecto en tu PC/Mac, inicia sesión en Megacursos.com/webapp en el navegador de tu computadora, accede a la clase que quieras y haz click en <b>Descarga de Archivos de clases</b>",
      buttons: ['OK']
    });
    alert.present()
  }
  playVideo(video, chapter) {
    var idchapter = video.id;
    this.status = video.status;
    var visto = video.ultima;
    var porcentaje, total;
    var inic;
    //var resta;
    var bandera;
    var valor;
    bandera = "false";
    var porcentajexx;
    var xxx;
    xxx = video.porcentaje;
    var y = this;
    jwplayer("myDiv")

    .setup({
        "playlist": chapter,
        "autostart": "false",
        "width": "100%",
        "aspectratio": "16:9",
        "logo": {
										file: 'https://megacursos.com/watermark-small.png',
										position: 'bottom-right',
										margin: '0',
										link: 'http://www.megacursos.com/'
									},
      })
      .onPlay(function(event) {
      })
      .onTime(function(event) {
        //  if ((y.status==0) || (this.producto.produc.licencia=="false")){
        if ((event.position - visto) > 2) {
          //console.log("adelanto");
          bandera = "false";
        }
        if ((visto - event.position) > 2) {
          //console.log("adelanto");
          bandera = "false";
        }
        total = event.duration;
        visto = event.position;
        inic = event.position;
        porcentaje = Math.floor((visto * 100) / total);
        //}
      });
    clearInterval(this.interval);
    this.interval = setInterval(function() {
      if (porcentaje == undefined) {
        //console.log("undefined");
      }
      else {
        if (bandera == "false") {
          valor = inic;
          //console.log(valor);
          bandera = "true";
        }
        else {
          porcentajexx = ((visto - valor) * 100) / total;
          xxx = parseFloat(xxx) + parseFloat(porcentajexx);
          if (xxx >= 80) {
            xxx = 100;
          }
          valor = visto;
        }
        y.saveVideo(xxx, idchapter, visto);
      }
    }
      , 10000);
  }
  saveVideo(porcentaje, idchapter, visto) {
    porcentaje = Math.floor(porcentaje);
    this.porcentajex = porcentaje + "%";
    this.playClase.porcentaje = porcentaje;
    if (porcentaje >= 85) {
      clearInterval(this.interval);
      this.playClase.status = 1;
      this.modulos[this.indexI].clases[this.indexJ].status = 1;
    }
    this.modulos[this.indexI].clases[this.indexJ].porcentaje = porcentaje;
    this.modulos[this.indexI].clases[this.indexJ].ultima = visto;
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let data = {
      porcentaje: porcentaje,
      idchapter: idchapter,
      visto: Math.floor(visto),
      id_usuario: this.idUsuario,
      curso: this.idCurso,
    };
    //console.log(data);
    this.http.post(url + '/users/update_video', data, options)
      .map(res => res.json())
      .subscribe(res => {
        //  console.log(res);
      });
  }

  getVideo(id) {
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let idUsuario=this.idUsuario;
    let data = {
    //  porcentaje: porcentaje,
      idChapter: id,
    //  visto: Math.floor(visto),
      idUsuario: this.idUsuario,
      curso: this.idCurso,
    };
    this.http.post(url + '/users/getvideo', data, options)
  //  this.http.get(url + '/users/getvideo/' + id+"/"+idUsuario)
      .map(res => res.json())
      .subscribe(res => {
        //console.log("si");
        if(res.autorice=="false"){
          let alert = this.alertCtrl.create({
            title: "Acceso restringido",
            subTitle: "No tiene permiso para acceder al curso, por favor valide su plan.",
            buttons: ['OK']
          });
          alert.present()
        }
        else{
        this.playVideo(this.playClase, res.video);
        //console.log(res);
      }
      });
  }

  ionViewWillLeave() {
    clearInterval(this.interval);
    this.pausado();
  //this.navCtrl.pop();
    console.log("Salir");
  }

  pausado() {
    console.log(jwplayer("myDiv").getState() );

    if (jwplayer("myDiv").getState() == "idle") {

    }
    if (jwplayer("myDiv").getState() == "paused") {
    }
    if (jwplayer("myDiv").getState() == "playing") {
     jwplayer("myDiv").stop();
    //  console.log("estado playing salir pausar")
    }

    if (jwplayer("myDiv").getState() == "buffering") {
     jwplayer("myDiv").stop();
    //  console.log("estado buffer salir pausar")
    }

  }

  openPage(idChapter) {
    this.reproduccion(idChapter);
    this.scrollTo("primero");
  }

}
