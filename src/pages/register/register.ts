import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginIonicPage} from "../login/login-ionic";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  username: string;
  password: string;
  showUserName = false; //show red alerts and text for username box
  showPassword = false; //show red alerts and text for password box
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = "";
    this.password = "";
  }

  input1func() {
    if (this.showUserName == true) {
      this.showUserName = false;
    }
  }

  input2func() {
    if (this.showPassword == true) {
      this.showPassword = false;
    }
  }

  signUp(){
    if ((this.username.length == 0)) {
      if (this.showUserName == false) {
        this.showUserName = true;
      }
    }
    if ((this.password.length == 0)) {
      if (this.showPassword == false) {
        this.showPassword = true;
      }
    }
    if (this.password.length > 0 && this.username.length > 0) {
      alert("ההרשמה התבצעה בהצלחה!");
      this.navCtrl.push(LoginIonicPage);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
