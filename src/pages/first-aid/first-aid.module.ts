import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstAidPage } from './first-aid';

@NgModule({
  declarations: [
    FirstAidPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstAidPage),
  ],
})
export class FirstAidPageModule {}
