import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {SettingsPage} from "../settings/settings";
import {LoginPage} from "../login/login";

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
  showUserName = false; //show red alerts and text for username box
  showPassword = false; //show red alerts and text for password box
  showDisplayName = false;
  newuser = {
    email:'',
    password:'',
    displayName:''
  };
  private opt: string = 'signup';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider,
              public loadingCtrl: LoadingController) {
  }

  // input1func() {
  //     this.showDisplayName = false;
  // }

  signUp() {

    if(this.newuser.displayName == '' || this.newuser.password == '' || this.newuser.email == ''){
      alert("לא כל הפרטים הוזנו")
    } else {
      this.loader = this.loadingCtrl.create({
        content: 'אנא המתן'
      });
      this.loader.present();
      this.userservice.adduser(this.newuser,this.loader).then((res: any) => {
        this.loader.dismissAll();
        if(res.success){
          this.navCtrl.push(SettingsPage);
        } else {
          this.loader.dismissAll();
          alert('error1: ' + res);
        }
    })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  refreshPage(){
    if (this.opt ==='signin'){
      this.navCtrl.setRoot(LoginPage);
    }
    // else if (this.opt ==='signup'){
    //   this.navCtrl.push(RegisterPage);
    // }

  }

}
