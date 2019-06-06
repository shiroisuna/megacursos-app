import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Plugins JAMP Created 06-06-2018
import { ImagePicker } from '@ionic-native/image-picker';

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

  constructor(private navParams: NavParams, private view: ViewController, private formBuilder: FormBuilder, 
  				private imagePicker: ImagePicker) {

  		this.datos = this.formBuilder.group({
  			post: ['', Validators.required],

  		});
  }


  subirFoto(){

  	
  }


  closeModal(){

  	this.view.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPublicPage');
  }

}
