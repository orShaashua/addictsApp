import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {ProfilepicPage} from "../profilepic/profilepic";
import {SettingsPage} from "../settings/settings";

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
  public loader;
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
              public userservice: UserProvider, public loadingCtrl: LoadingController) {
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
      this.loader = this.loadingCtrl.create({
        content: 'אנא המתן'
      });
      this.loader.present();
      this.userservice.adduser(this.newuser,this.loader).then((res: any) => {
        this.loader.dismissAll();
      if(res.success){
        this.navCtrl.push(ProfilepicPage);
      } else {
        this.loader.dismissAll();
        alert('error1: ' + res);
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
