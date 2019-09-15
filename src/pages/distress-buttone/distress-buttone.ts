import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import firebase from "firebase";
/**
 * Generated class for the DistressButtonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distress-buttone',
  templateUrl: 'distress-buttone.html',
})
export class DistressButtonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userservice : UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistressButtonePage');
  }
  sendHelpMessage(){
    // this.userservice.getPosition().then((pos)=>{
    //   alert(pos);
      var pos = "תל אביב, רחוב אבן גבירול, 27";

        var addMessage = firebase.functions().httpsCallable('sendHelpMessage');
        addMessage({text: pos}).then(function(result) {
          // Read result of the Cloud Function.
          //         var sanitizedMessage = result.data.text;
          //         // ...
          alert("מיקומך נשלח לכל המשתמשים");
        });



  }

}
