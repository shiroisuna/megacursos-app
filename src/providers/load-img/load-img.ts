import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file';
import { Platform } from 'ionic-angular';

/*
  Generated class for the LoadImgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadImgProvider {

	stack_aux: any[] = [];
	formulario: FormData;

  constructor(public http: HttpClient, private file: File, private platform: Platform) {
    
  }

  /**
	*
  * @param {array} fotos
  * @returns {Promise}

  */

  public getFormulario(fotos: string[]): Promise<any>{
  	let promesa = new Promise((resolve, reject) => {
  		this.formulario = new FormData();

  		this.stack_aux = [];

  		if (this.platform.is('cordova')) {
  			if (this.platform.is('ios')) {
  				for (let i = 0; i < fotos.length; i++) {
  					this.file.resolveLocalFileSystemUrl("file://" + fotos[i])
  					.then((entry) => 
  						(<FileEntry>entry).file(file => {
  							const reader = new FileReader();

  							reader.onload = (data) => {

  								const imgBlob = new Blob([reader.result], { type: file.type });
  								this.formulario.append('foto' + (i+1), imgBlob, file.name);


  								this.stack_aux.push('foto' + (i+1) );
  								if (this.stack_aux.length == fotos.length) {

  									resolve(this.formulario);

  								}

  								reader.readAsArrayBuffer(file);
  							};
  					})).catch( err => {
  						reject(err)
  					});
  				}
  			}

  			if (this.platform.is('android')) {
  				for (let i = 0; i < fotos.length; i++) {

  					this.file.resolveLocalFileSystemUrl(fotos[i])
  					.then((entry) => 
  						(<FileEntry>entry).file(file => {
  							const reader = new FileReader();

  							reader.onload = (data) => {

  								const imgBlob = new Blob([reader.result], { type: file.type });
  								this.formulario.append('foto' + (i+1), imgBlob, file.name);


  								this.stack_aux.push('foto' + (i+1) );
  								if (this.stack_aux.length == fotos.length) {

  									resolve(this.formulario);

  								}

  								reader.readAsArrayBuffer(file);
  							};
  					})).catch( err => {
  						reject(err)
  					});

  				}
  			}
  		}else{

  			reject(false);
  		}
  	});

  	return promesa;

  }


  // getFormulario(arr){

  // }

}
