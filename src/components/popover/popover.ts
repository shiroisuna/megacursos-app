import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  text: string;
  modulos: any;
  constructor(public navParams: NavParams, public viewctrl: ViewController) {
    console.log('Hello PopoverComponent Component');
    this.text = 'Hello World';

    let x = this.navParams.data.item;
    this.modulos = this.navParams.data.item;
    console.log(this.modulos);
    console.log(x);
  }
  enviar(i) {
    let x = i;
    this.viewctrl.dismiss(x);
    //console.log(x)
  }

}
