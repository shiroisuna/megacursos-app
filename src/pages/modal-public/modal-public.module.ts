import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPublicPage } from './modal-public';

@NgModule({
  declarations: [
    ModalPublicPage,
  ],
  imports: [
    // IonicPageModule.forChild(ModalPublicPage),
  ],
  exports: [
  	ModalPublicPage,
  ]
})
export class ModalPublicPageModule {}
