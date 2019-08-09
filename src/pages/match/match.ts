import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sender = navParams.get('sender');
    this.recipient = navParams.get('recipient');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchPage');
  }

}
