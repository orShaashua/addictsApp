import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseAvatarPage } from './choose-avatar';

@NgModule({
  declarations: [
    ChooseAvatarPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseAvatarPage),
  ],
})
export class ChooseAvatarPageModule {}
