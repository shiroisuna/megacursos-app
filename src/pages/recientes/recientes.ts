import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, Content, Events, AlertController, LoadingController, Tabs } from 'ionic-angular';
import { SERVER_URL } from '../../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PopoverComponent } from '../../components/popover/popover';
declare var jwplayer;

let url = SERVER_URL;

@Component({
  selector: 'page-recientes',
  templateUrl: 'recientes.html',
})
export class RecientesPage {

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
  buttonColor: string = '#fff';
  myVar: string = 'ok';
  selection;
  //inicio;
  fin;
  tab: Tabs;
  valor;

  @ViewChild('pageTop') pageTop: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public popoverCtrl: PopoverController,
    private events: Events,
    public alertCtrl: AlertController,
    public loading: LoadingController,
  ) {
    this.idChapter = navParams.data.idChapter;
    this.idCurso = navParams.data.idCurso;
    var data = JSON.parse(window.localStorage.getItem("isLogin"));
    this.idUsuario = data.datos.id;

    this.tab = this.navCtrl.parent;

  }
  scrollTo(element: string) {
    let yOffset = document.getElementById(element).offsetTop;
    this.pageTop.scrollTo(0, yOffset, 4000)
  }
  ionViewDidLoad() {
    console.log(this.idChapter);
    console.log('ionViewDidLoad RecientesPage');
    console.log(this.idCurso);
  }

  ionViewWillEnter() {
    this.recientes();
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
  recientes() {
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    this.http.get(url + '/users/reciente/' + this.idChapter + '/' + this.idCurso + '/' + this.idUsuario, options)
      .map(res => res.json())
      .subscribe(res => {
        if (res.modulos == "noAutorize") {
          let alert = this.alertCtrl.create({
            title: "Acceso restringido",
            subTitle: "Verifique su plan",
            buttons: ['OK']
          });
          this.navCtrl.pop();
          alert.present()
          this.tab.select(1);
        } else {
          this.modulos = res.modulos;
          this.info = res.curso;
          //console.log(this.info);
          this.idModulo = res.moduloActivo.part_no;
          var x;
          for (let modulo of this.modulos) {
            x = 0;
            if (modulo.id == this.idModulo) {
              this.moduloActual = modulo;
              //console.log("aqui");
              let bandera = true;
              break;
              //return;
            }
            x++;
          }
          this.reproduccion(this.idChapter, x);
          this.indexI = x;
          console.log(this.moduloActual);
        }
      });
  }

  reproduccion(idChapter, i) {
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

  playVideo(video, chapter) {
    var idchapter = video.id;
    this.status = video.status;
    var visto = video.ultima;
    var porcentaje, total;
    var inic;
    var resta;
    var bandera;
    var valor;
    bandera = "false";
    var porcentajexx;
    var xxx;
    xxx = video.porcentaje;
    var y = this;
    var salva;
    jwplayer("myDiv")
      //.getBuffer(10)
      .setup({
        "playlist": chapter,
        "autostart": "false",
        //"height":"40%" ,
        "width": "100%",
        //"width": "50%",
        "allowfullscreen": "true",
        "aspectratio": "16:9",
        "logo": {
          file: 'https://megacursos.com/watermark-small.png',
          position: 'bottom-right',
          margin: '0',
          link: 'http://www.megacursos.com/'
        },
      })/*
      .onPlay(function(event) {
        // y.cc();
        console.log(event);
        console.log("play");

      })*/
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
        console.log("undefined");
      }
      else {
        if (bandera == "false") {
          valor = inic;
          console.log(valor);
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
    if (porcentaje >= 80) {
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
    console.log(data);
    this.http.post(url + '/users/update_video', data, options)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
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
    console.log("Salir Salir");
  }

  pausado() {
    console.log(jwplayer("myDiv").getState());

    if (jwplayer("myDiv").getState() == "idle") {
      //  jwplayer("myDiv").pause();
      console.log("sin iniciar no hago nada")
    }
    if (jwplayer("myDiv").getState() == "paused") {
      jwplayer("myDiv").stop();
      //  jwplayer("myDiv").pause();
      //console.log("estado paused salir normal")
    }
    if (jwplayer("myDiv").getState() == "playing") {
      jwplayer("myDiv").stop();
      //console.log("estado playing salir pausar")
    }

    if (jwplayer("myDiv").getState() == "buffering") {
      jwplayer("myDiv").stop();
    //  console.log("estado buffer salir pausar")
    }
    console.log(jwplayer("myDiv").getState());
  }

  openPage(idChapter, i) {
    this.reproduccion(idChapter, i);
    this.scrollTo("primero");
  }

}
