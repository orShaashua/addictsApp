import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MatchesPage} from "../matches/matches";
import firebase from "firebase";
import {RequestsProvider} from "../../providers/requests/requests";
import {connreq} from "../../models/interfaces/request";
import {TabsPage} from "../tabs/tabs";
import {SearchFriendsPage} from "../search-friends/search-friends";

/**
 * Generated class for the MatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {
  recipient: any;
  sender: any;
  newrrequest ={} as connreq;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestservice: RequestsProvider, public alertCtrl: AlertController) {
    this.sender = navParams.get('sender');
    this.recipient = navParams.get('recipient');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchPage');
  }
  keepSwiping() {
    this.navCtrl.pop();
  }
  sendFriendsRequest(){
    this.newrrequest.sender = firebase.auth().currentUser.uid;
    this.newrrequest.recipient = this.recipient.uid;
    let successalert = this.alertCtrl.create({
      title: 'Request sent',
      subTitle: 'Your request was sent to ' + this.recipient.displayName,
      buttons: ['ok']
    });
    this.requestservice.sendrequest(this.newrrequest).then((res: any) => {
      if (res.success) {
        successalert.present();
      }
    }).catch((err) => {
      alert(err);
    });
    this.navCtrl.pop();
  }

}
