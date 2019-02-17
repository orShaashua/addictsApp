import {Component, ViewChild} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl} from "@angular/forms";
import {NavController} from "ionic-angular";
import {RegisterPage} from '../register/register';
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'login-ionic.html'
})
export class LoginIonicPage {

  // @ViewChild('username') uname;
  // @ViewChild('password') password;comment

  username:string;
  password: string;

  // myform: FormGroup;


  constructor(public navCtrl: NavController) {
    this.username = "";
    this.password = "";
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
  signIn(){
    //
    if((this.username.length == 0) || (this.password.length == 0)){
      alert("לא הזנת את כל הנתונים")
    } else {
      alert("hi! your name is: " + this.username.toString() + "\nand your password is: " +  this.password.toString());
    }
  }
}
