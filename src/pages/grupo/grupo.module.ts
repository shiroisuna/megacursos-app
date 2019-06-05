import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrupoPage } from './grupo';
import { ModalPublicPage } from '../modal-public/modal-public';
import { ModalPublicPageModule } from '../modal-public/modal-public.module';


@NgModule({
	
  declarations: [
    GrupoPage,
    // ModalPublicPage
  ],
  imports: [
    // IonicPageModule.forChild(ModalPublicPage),
    ModalPublicPage,
    ModalPublicPageModule
  ],
  entryComponents: [
		ModalPublicPage
	],
})
export class GrupoPageModule {}