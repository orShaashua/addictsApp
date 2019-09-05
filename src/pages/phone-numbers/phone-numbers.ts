import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ContentProvider} from "../../providers/content/content";

/**
 * Generated class for the PhoneNumbersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phone-numbers',
  templateUrl: 'phone-numbers.html',
})
export class PhoneNumbersPage {
  phone_numbers_picture;
  imageloaded: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController, private contentservice: ContentProvider) {

  }
  ionViewWillEnter() {
    this.imageloaded = false;
    this.contentservice.getPhoneNumbersPic().then((res) =>{
      this.phone_numbers_picture = res;
      this.imageloaded = true;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneNumbersPage');
  }

}
