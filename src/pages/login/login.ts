import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {usercreds} from '../../models/interfaces/usercreds'
import {AuthProvider} from "../../providers/auth/auth";
import {TabsPage} from "../tabs/tabs";


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
  credentials = {} as usercreds;
  username: string;
  password: string;
  showUserName = false; //show red alerts and text for username box
  showPassword = false; //show red alerts and text for password box

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public authservice: AuthProvider) {
    this.credentials.email = "";
    this.credentials.password = "";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  input1func() {
    this.showUserName = false;
    this.showPassword = false;
  }

  input2func() {
    this.showPassword = false;
    this.showUserName = false;
  }

  //
  register() {
    this.navCtrl.push(RegisterPage);
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: "Info!",
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  //
  signIn() {
    if ((this.credentials.email.length == 0)) {
      if (this.showUserName == false) {
        this.showUserName = true;
      }
    }
    if ((this.credentials.password.length == 0)) {
      if (this.showPassword == false) {
        this.showPassword = true;
      }
    }


    if (this.credentials.password.length > 0 && this.credentials.email.length > 0) {
      this.authservice.login(this.credentials).then((res: any) => {
        if(!res.code){
          alert(res);
          this.navCtrl.push(TabsPage);
        } else {
          alert(res);
        }
      })
      // this.fire.auth.currentUser.get
      // alert("hi! your name is: " + this.username.toString() + "\nand your password is: " + this.password.toString());
      // this.navCtrl.push(ProfilePage,{username:this.username})
    }

    // }


    //


  }
}
