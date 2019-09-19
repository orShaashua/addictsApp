import { Component } from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {usercreds} from '../../models/interfaces/usercreds'
import {AuthProvider} from "../../providers/auth/auth";
import {TabsPage} from "../tabs/tabs";

import {PasswordresetPage} from "../passwordreset/passwordreset";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loader;
  showUserName = false; //show red alerts and text for username box
  showPassword = false; //show red alerts and text for password box
  credentials = {} as usercreds;

  // showUserName = false; //show red alerts and text for username box
  // showPassword = false; //show red alerts and text for password box
  private opt: string = 'signin';
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public authservice: AuthProvider,
              public userservice: UserProvider, public loadingCtrl: LoadingController) {
    this.credentials.email = "";
    this.credentials.password = "";
    console.log('constructor LoginPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // input1func() {
  //   this.showUserName = false;
  //   this.showPassword = false;
  // }
  //
  // input2func() {
  //   this.showPassword = false;
  //   this.showUserName = false;
  // }


  alert(message: string) {
    this.alertCtrl.create({
      title: "Info!",
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  //
  signIn() {
    console.log('signIn LoginPage');
    if ((this.credentials.email.length == 0)) {
      alert("לא הוזן איימל")
    }
    else if ((this.credentials.password.length == 0)) {
      alert("לא הוזנה סיסמאה")
    }


    if (this.credentials.password.length > 0 && this.credentials.email.length > 0) {
      this.authservice.login(this.credentials).then((res: any) => {
        if(!res.code){
          const res = this.userservice.updateLocation();
          this.navCtrl.push(TabsPage);
        } else {
          alert(res);
        }
      })
    }


  }

  passwordreset(){
    this.navCtrl.push(PasswordresetPage);
  }

  refreshPage(){
    if (this.opt ==='signin'){
      this.navCtrl.push(LoginPage);
    }else if (this.opt ==='signup'){
      this.navCtrl.push(RegisterPage);
    }

  }


}
