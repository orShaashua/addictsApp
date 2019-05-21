import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from '../../providers/user/user'
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
  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider) {
  //for now all users matches!! need to handle this!!!
    this.userservice.getallusers().then((res: any)=>{
      this.filteredusers = res;

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchesPage');
  }

}
