import {Component, ViewChild} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl} from "@angular/forms";
import {NavController} from "ionic-angular";
import {RegisterPage} from '../register/register';
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'login-ionic.html'
})
export class LoginIonicPage {

  username: string;
  password: string;
  showUserName = false; //show red alerts and text for username box
  showPassword = false; //show red alerts and text for password box

  constructor(public navCtrl: NavController) {
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
      }

  }
}
