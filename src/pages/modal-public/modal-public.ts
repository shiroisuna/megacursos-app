import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../providers/global/global';
import { IonicPage, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Plugins JAMP Created 06-06-2018
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

import { LoadImgProvider } from '../../providers/load-img/load-img';

let url = SERVER_URL;

/**
 * Generated class for the ModalPublicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-public',
  templateUrl: 'modal-public.html',
})
export class ModalPublicPage {

	datos: FormGroup;

  fotos: any[] = [];

  formulario: FormData;

  loading: any;

  constructor(private navParams: NavParams, private view: ViewController, 
    private formBuilder: FormBuilder, 
  	private imagePicker: ImagePicker, public toastCtrl: ToastController, 
    public http: Http, public loadCtrl: LoadingController) {

  		this.datos = this.formBuilder.group({
  			post: ['', Validators.required],

  		});
  }


  mostrar_mensaje(msj){

    let toast = this.toastCtrl.created({
      message: msj,
      duration: 3000,
      position: button
    });
    toast.present();
  }

  presentLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Posteando...'
    });
    this.loading.present();
  }

  subirFoto(){

    // let array = [];

    // array[0] = 'assets/imgs/marty-avatar.png';
    // array[1] = 'assets/imgs/marty-avatar.png';
    // array[2] = 'assets/imgs/marty-avatar.png';

    // this.fotos = array;

  	let options: ImagePickerOptions = {

  		maximumImagesCount: 3

  	}

  	this.imagePicker.getPictures(options)
      .then((results) => {
        this.fotos = results;
    	  for (var i = 0; i < results.length; i++) {
    	      console.log('Image URI: ' + results[i]);
    	  }
	    }, (err) => { });

  }

  borrarFoto(index){

    this.fotos.splice(index, 1);

  }

  postear(){

    if (this.fotos.length < 1) {
      this.mostrar_mensaje("Cargar Al menos una foto");
    }

    this.presentLoad();

    this.LoadImgProvider.getFormulario(this.datos)
    .then((result) => {
      this.formulario = result;
      this.formulario.append('post', this.datos.get('post').value);

      this.http.post(url + '/addpost', {})
      .suscribe(resp => {
        resolve(resp);
        this.loading.dissmis();
      }).catch(err => {
        reject(err);
      })
    }).catch(err => {
      this.mostrar_mensaje(err);
    });
  }  

  closeModal(){

  	this.view.dismiss();

  }

  

}
