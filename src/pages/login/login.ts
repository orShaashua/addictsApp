import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {ChatPage} from "../chat/chat";
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

  username: string;
  password: string;
  showUserName = false; //show red alerts and text for username box
  showPassword = false; //show red alerts and text for password box

  constructor(public navCtrl: NavController) {
    this.username = "";
    this.password = "";
  }

  input1func() {
    this.showUserName = false;
    this.showPassword = false;
  }

  input2func() {
    this.showPassword = false;
    this.showUserName = false;
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  signIn() {
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
      alert("hi! your name is: " + this.username.toString() + "\nand your password is: " + this.password.toString());
      this.navCtrl.push(ChatPage,{username:this.username})
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
