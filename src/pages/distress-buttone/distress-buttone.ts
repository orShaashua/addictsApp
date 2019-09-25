import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import { AngularFireFunctions } from '@angular/fire/functions'


@IonicPage()
@Component({
  selector: 'page-distress-buttone',
  templateUrl: 'distress-buttone.html',
})
export class DistressButtonePage {


  constructor(private fns: AngularFireFunctions,
              public navCtrl: NavController, public navParams: NavParams, private userservice : UserProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistressButtonePage');
  }
  sendHelpMessage(){
    var address = "אוניברסיטת בר אילן, רמת גן";
    var addMessage = this.fns.httpsCallable('sendHelpMessage');
    addMessage({text: address}).toPromise()
      .then(() => {
        alert("מיקומך נשלח לכל המשתמשים");
        console.log("send help notification");
      })
      .catch(err => {
        console.error({ err });
      });
  }
}
