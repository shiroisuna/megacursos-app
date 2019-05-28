import { Component } from '@angular/core';
import {  NavController,NavParams,ViewController} from 'ionic-angular';
/**
 * Generated class for the PopovermegatestComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popovermegatest',
  templateUrl: 'popovermegatest.html'
})

export class PopovermegatestComponent {
  text: string;
  modulos:any;
  constructor(public navParams:NavParams,public viewctrl:ViewController) {
    console.log('Hello PopovermegatestComponent Component');
    this.text = 'Hello World';
    this.modulos = this.navParams.data.item;
    console.log(this.modulos);
  }

 enviar(){
let x=1;
this.viewctrl.dismiss(x);
//console.log(x)
 }
}
