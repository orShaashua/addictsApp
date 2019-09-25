import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {LoginPage} from "../login/login";


@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {

  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public userservice: UserProvider) {
    this.email = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }

  reset(){
    let alert = this.alertCtrl.create({
      buttons: ['ok']
    });
  this.userservice.passwordreset(this.email).then((res: any) =>{
    if(res.success){
      alert.setTitle('האימייל נשלח');
      alert.setSubTitle("נא לעקוב אחר ההוראות באימייל כדי לאפס את הסיסמא")
    } else{
      alert.setTitle('Failed');
    }
  })
  }

  goback(){
    this.navCtrl.setRoot(LoginPage);
  }

}
