import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the BuddiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
///this page is not good - copy of matches - try to fix this later.
export class BuddiesPage {
  temparr = [];
  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider) {
    //for now all users matches!! need to handle this!!!
    this.userservice.getallusers().then((res: any)=>{
      this.filteredusers = res;
      this.temparr = res;
    })
  }

  ionViewDidLoad() {
  }

  searchuser(searchbar){
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if(q.trim() == ''){
      return;
    }
    this.filteredusers = this.filteredusers.filter((v)=>{
      if((v.displayName.toLowerCase().indexOf(q.toLowerCase()))> -1){
        return true;
      }
      return false;
    })


  }


}
