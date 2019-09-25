import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from "../profile/profile";
import {UserProvider} from "../../providers/user/user";
import {TabsPage} from "../tabs/tabs";


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
        this.navCtrl.push(TabsPage);
      }
    })
  }
}
