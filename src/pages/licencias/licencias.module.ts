import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LicenciasPage } from './licencias';

@NgModule({
  declarations: [
    LicenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(LicenciasPage),
  ],
})
export class LicenciasPageModule {}
