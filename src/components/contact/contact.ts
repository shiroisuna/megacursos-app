import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'contact',
  templateUrl: 'contact.html'
})
export class ContactComponent {

  text: string;
  modulos: any;
  constructor(public navParams: NavParams, public viewctrl: ViewController) {
    console.log('Hello ContactComponent Component');
    //let x=this.navParams.data.item;
    this.modulos = this.navParams.data.item;
    console.log(this.modulos);
    // console.log(x);

    //this.text = 'Hello World';
  }

  enviar(i) {
    let x = i;
    this.viewctrl.dismiss(x);
    console.log(x)
  }

}
