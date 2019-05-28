import { Component } from '@angular/core';
@Component({
  selector: 'reciente',
  templateUrl: 'reciente.html'
})
export class RecienteComponent {

  text: string;

  constructor() {
    console.log('Hello RecienteComponent Component');
    this.text = 'Hello World';
  }

}
