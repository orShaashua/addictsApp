import {Component, EventEmitter} from '@angular/core';
import {Events, IonicPage, LoadingController, ModalController, NavParams,} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {UserProvider} from "../../providers/user/user";
import {LikesProvider} from "../../providers/likes/likes";
import firebase from "firebase";
import {connreq} from "../../models/interfaces/request";
import {MatchPage} from "../match/match";


@IonicPage()
@Component({
  selector: 'page-search-friends',
  templateUrl: 'search-friends.html',
})
export class SearchFriendsPage {
  searchedFriends: any;
  firedata = firebase.database().ref('/likes');
  newrrequest = {} as connreq;
  ready = false;
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
    like: {
      backgroundColor: '#28e93b'
    },
    dislike: {
      backgroundColor: '#e92828'
    }
  };

  constructor(private sanitizer: DomSanitizer, public userservice: UserProvider,
              public navParams: NavParams, public loadingCtrl: LoadingController, public modalCtrl: ModalController,
              public likesService: LikesProvider, public events: Events) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    let currentYear = (new Date()).getFullYear();
    let loader = this.loadingCtrl.create({
      content: 'אנא המתן'
    });
    loader.present();
    this.userservice.getMySearchFriends().then((res: any) => {
      if (!res) {
        loader.dismiss();
        return;
      }
      this.searchedFriends = res;
      this.ready = true;
      this.likesService.getMyLikedList().then((alreadyLiked: any) => {
        for (let i = 0; i < this.searchedFriends.length; i++) {
          var addToSearchFriends = true;
          for (let j = 0; j < alreadyLiked.length; j++) {
            if (this.searchedFriends[i].uid == alreadyLiked[j]) {
              addToSearchFriends = false;
              break;
            }
          }
          if (addToSearchFriends) {
            this.attendants.push({
              id: i + 1,
              likeEvent: new EventEmitter(),
              destroyEvent: new EventEmitter(),
              asBg: this.sanitizer.bypassSecurityTrustStyle('url(' + this.searchedFriends[i].photoURL + ')'),
              uid: this.searchedFriends[i].uid,
              displayName: this.searchedFriends[i].displayName,
              age: currentYear - this.searchedFriends[i].settings.bdayYear,
              photoURL: this.searchedFriends[i].photoURL
            });
          }
        }
        loader.dismiss();
      });
    });
  }


  onCardInteract(event, recipient) {
    if (event.like) {
      var havaMatch = false;
      this.newrrequest.sender = firebase.auth().currentUser.uid;
      this.newrrequest.recipient = recipient.uid;
      this.firedata.child(this.newrrequest.sender).once('value', (snapshot) => {
        //for example: Dana: shira, maya it will give me shira and maya
        let currentUsersLikes = snapshot.val();
        for (var key in currentUsersLikes) {
          //this means that both users liked each other
          if (recipient.uid == currentUsersLikes[key].sender) {
            let modal = this.modalCtrl.create(MatchPage, {
              sender: firebase.auth().currentUser,
              recipient: recipient
            });
            modal.present();
            havaMatch = true;
          }
        }
        this.likesService.sendlike(this.newrrequest).then((res: any) => {
          if (res.success && !havaMatch) {
            this.likesService.listenForNewLike(recipient.uid).then(() => {
              // this.likesService.getLatestMatch().then((lastMatch)=>{
              //   if (lastMatch != recipient.uid) {
              firebase.database().ref('/users').child(recipient.uid).once('value', (snapshot) => {
                let myMatchUser = snapshot.val();
                let modal = this.modalCtrl.create(MatchPage, {
                  sender: firebase.auth().currentUser,
                  recipient: myMatchUser
                });
                modal.present();
              });
            });
          }
        }).catch((err) => {
          alert(err);
        });
      })
    }
  }


}
