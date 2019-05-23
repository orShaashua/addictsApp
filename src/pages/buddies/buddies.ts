import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {RequestsProvider} from "../../providers/requests/requests";
import {connreq} from '../../models/interfaces/request';
import firebase from 'firebase';
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
  newrrequest ={} as connreq;
  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider,public alertCtrl: AlertController, public requestservice: RequestsProvider) {
    //for now all users matches!! need to handle this!!!
    let mywishFriendslist = this.requestservice.getmywishfriendslist();
    var add = true;
    var counter =0;
    this.userservice.getallusers().then((res: any)=>{
      this.filteredusers = [];
      this.temparr = [];

      for (var key  in res) {
        add = true;
        for (var frienduid in mywishFriendslist) {
          if (mywishFriendslist[frienduid] == res[key].uid) {
            add = false;
            counter ++;
            break;
          }
        }
        if (add) {
          this.filteredusers.push(res[counter]);//need to be all matches and not all users!
          this.temparr.push(res[counter]);//need to be all matches and not all users!
          counter++;
        }
      }

    })
  }
  ionViewDidLoad() {}

  searchuser(searchbar){
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if(q.trim() == ''){
      return;
    }
    this.filteredusers = this.filteredusers.filter((v)=>{
      return v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1;
    })
  }
  sendreq(recipient){
    this.newrrequest.sender = firebase.auth().currentUser.uid;
    this.newrrequest.recipient = recipient.uid;
    if(this.newrrequest.sender == this.newrrequest.recipient){
      alert("You are friends always");
    }else {
      let successalert = this.alertCtrl.create({
        title: 'Request send',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });
      this.requestservice.sendrequest(this.newrrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      });
    }
  }
}
