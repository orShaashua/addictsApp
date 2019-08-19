import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from "../profile/profile";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the ChooseAvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-choose-avatar',
  templateUrl: '../choose-avatar/choose-avatar.html',
})
export class ChooseAvatarPage {
  img:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userhandler: UserProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseAvatarPage');
  }
  select(imgs) {
    this.userhandler.updateimage(imgs).then((res: any) => {
      if (res.success) {
        this.navCtrl.setRoot(ProfilePage);
      }
    })
  }
}
