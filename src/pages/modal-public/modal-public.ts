import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Plugins JAMP Created 06-06-2018
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

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

  	let options: ImagePickerOptions = {

  		maximumImagesCount: 3

  	}

  	this.imagePicker.getPictures(options).then((results) => {
	  for (var i = 0; i < results.length; i++) {
	      console.log('Image URI: ' + results[i]);
	  }
	}, (err) => { });

  }


  closeModal(){

  	this.view.dismiss();

  }

  

}
