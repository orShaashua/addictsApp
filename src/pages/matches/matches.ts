import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user'
import {LikesProvider} from "../../providers/likes/likes";
/**
 * Generated class for the MatchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {
  mymatchList =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public likesservice: LikesProvider, public events:Events) {
      //for now all users matches!! need to handle this!!!
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchesPage');
  }
  ionViewWillEnter  (){

    this.events.subscribe('gotmatch', (user)=>{
      this.mymatchList.push(user);
    });
  }
}
