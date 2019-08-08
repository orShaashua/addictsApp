import { Component,EventEmitter } from '@angular/core';
import {IonicPage, LoadingController, NavParams,} from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import {UserProvider} from "../../providers/user/user";
import {LikesProvider} from "../../providers/likes/likes";
import firebase from "firebase";
import {connreq} from "../../models/interfaces/request";

/**
 * Generated class for the SearchFriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-friends',
  templateUrl: 'search-friends.html',
})
export class SearchFriendsPage {
  searchedFriends:any;
  firedata = firebase.database().ref('/likes');
  newrrequest ={} as connreq;
  ready = false;
  attendants = [];
  // alreadyLiked = [];
  cardDirection = "xy";
  cardOverlay: any = {
    like: {
      backgroundColor: '#28e93b'
    },
    dislike: {
      backgroundColor: '#e92828'
    }
  };

  // public filteredUsers: Array<any> = [];
  // public itemRef: firebase.database.Reference = firebase.database().ref('/users');

  // filtersFromUser = new Filters();

  constructor(private sanitizer: DomSanitizer,  public userservice: UserProvider,
              public navParams: NavParams, public loadingCtrl: LoadingController,  public likesService: LikesProvider) {
    let loader = this.loadingCtrl.create({
      content: 'אנא המתן'
    });
    loader.present();
    this.userservice.getMySearchFriends().then((res: any)=>{
      this.searchedFriends = res;
      this.ready = true;
      for (let i = 0; i < this.searchedFriends.length; i++) {
        // var addToSearchFriends = true;
        // for(let j = 0; j < this.alreadyLiked.length; j++){
        //   if (this.searchedFriends[i].uid == this.alreadyLiked[j]){
        //     addToSearchFriends = false;
        //     break;
        //   }
        // }
        // if (addToSearchFriends) {
          this.attendants.push({
            id: i + 1,
            likeEvent: new EventEmitter(),
            destroyEvent: new EventEmitter(),
            asBg: this.sanitizer.bypassSecurityTrustStyle('url(' + this.searchedFriends[i].photoURL + ')'),
            uid: this.searchedFriends[i].uid,
            // displayName: this.users[i].displayName
          });
        // }
      }
      loader.dismissAll();

    });
    loader.dismissAll();
  }

  ionViewWillEnter() {
  }

  onCardInteract(event, recipient) {
    if(event.like){
      this.newrrequest.sender = firebase.auth().currentUser.uid;
      this.newrrequest.recipient = recipient.uid;
      this.firedata.orderByChild(this.newrrequest.sender).once('value', (snapshot) => {
        // resolve(snapshot.val());
        let usersdata =snapshot.val();
        for (var key in usersdata){
          //this means that both users liked each other
          for (var user in usersdata[key]) {
            if (recipient.uid == usersdata[key][user].sender) {
              var jll = 0
            }
          }
        }
        this.likesService.sendlike(this.newrrequest).then((res: any) => {
          if (res.success) {
            // this.alreadyLiked.push(recipient.uid);
            // let sentuser = this.attendants.indexOf(recipient);
            // this.attendants.splice(sentuser, 1);
          }
        }).catch((err) => {
          alert(err);
        });
      }).catch((err) => {
        // reject(err);
      });

    }
    console.log(event);
  }


}
