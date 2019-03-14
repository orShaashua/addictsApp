import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

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
  showDisplayName = false;
  newuser = {
    email:'',
    password:'',
    displayName:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider) {
    this.username = "";
    this.password = "";
  }

  input1func() {
      this.showDisplayName = false;
  }

  signUp() {

    if(this.newuser.displayName == '' || this.newuser.password == '' || this.newuser.email == ''){
      this.showDisplayName = true;
    } else {

    this.userservice.adduser(this.newuser).then((res: any) => {
      if(res.success){
        this.navCtrl.popTo(RegisterPage);
      } else {
        alert('error: ' + res);
      }
    })

      // alert("ההרשמה התבצעה בהצלחה!");
      // this.navCtrl.popTo(RegisterPage);
      // }
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
