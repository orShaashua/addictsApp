import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneNumbersPage } from './phone-numbers';

@NgModule({
  declarations: [
    PhoneNumbersPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneNumbersPage),
  ],
})
export class PhoneNumbersPageModule {}
