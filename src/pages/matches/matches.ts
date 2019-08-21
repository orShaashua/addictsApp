import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Events} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {RequestsProvider} from "../../providers/requests/requests";
import {connreq} from '../../models/interfaces/request';
import firebase from 'firebase';
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
  newrrequest ={} as connreq;
  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider, public alertCtrl: AlertController,
              public events:Events, public requestservice: RequestsProvider, public likeservice: LikesProvider) {
    //for now all users matches!! need to handle this!!!
    // this.removeUsersThatIAlreadySendRequestFromFilter();
    // let alluserssettings;
    // this.userservice.getallusersdetails("settings").then((res: any)=>{

    //   alluserssettings = res;
    // });
  }
  ionViewDidEnter(){
    this.removeUsersThatIAlreadySendRequestFromFilter();

  }

  // searchuser(searchbar){
  //   this.filteredusers = this.temparr;
  //   var q = searchbar.target.value;
  //   if(q.trim() == ''){
  //     return;
  //   }
  //   this.filteredusers = this.filteredusers.filter((v)=>{
  //     return v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1;
  //   })
  // }
  sendreq(recipient){
    this.newrrequest.sender = firebase.auth().currentUser.uid;
    this.newrrequest.recipient = recipient.uid;
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
  removeUsersThatIAlreadySendRequestFromFilter(){
    //these are the users that i liked
    this.requestservice.getMyWishFriendsList().then((myishfriendslist)=>{
      var add = true;
      var counter = 0;
      //get all the users I have with them a match
      this.likeservice.getAllMyMatches().then((res: any)=>{
        this.filteredusers = [];
        for (var key in res) {
          //don't add the current user to the filteredusers
          if (res[key].uid != firebase.auth().currentUser.uid) {
            add = true;
            //don't add to the filteredusers users that I already sent them a request
            for (var myishfriend in myishfriendslist) {
              if (myishfriendslist[myishfriend] == res[key].uid) {
                add = false;
                counter++;
                break;
              }
            }
            //don't add to the filteredusers users that we are already friends
            for (var friend in this.requestservice.myfriends) {
              if (this.requestservice.myfriends[friend].uid == res[key].uid) {
                add = false;
                counter++;
                break;
              }
            }
            //don't add to the filteredusers users that sent me request already
            for (var user in this.requestservice.userdetails) {
              if (this.requestservice.userdetails[user].uid == res[key].uid) {
                add = false;
                counter++;
                break;
              }
            }
            //add to the filteredusers all the rest
            if (add) {
              this.filteredusers.push(res[counter]);
              counter++;
            }
          } else {
            counter++;
          }
        }
      });
    });
  }
}
