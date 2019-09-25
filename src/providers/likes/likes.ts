import {Injectable} from '@angular/core';
import {connreq} from "../../models/interfaces/request";
import firebase from "firebase";
import {MatchPage} from "../../pages/match/match";
import {Events, ModalController} from "ionic-angular";
import {UserProvider} from "../user/user";
import {AngularFireFunctions} from "@angular/fire/functions";


@Injectable()
export class LikesProvider {
  firereq = firebase.database().ref('/likes');

  constructor(public events: Events, public userservice: UserProvider, private fns: AngularFireFunctions) {
    console.log('Hello LikesProvider Provider');
  }

  sendlike(req: connreq) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender,
      }).then(() => {
        resolve({success: true});///send sms to req.recipient
      }).catch((err) => {
        resolve(err);
      })
    });
    return promise;
  }

  getMyLikedList() {
    return new Promise((resolve) => {
      let alreadyLiked = [];
      this.firereq.orderByKey().once('value', (snapshot) => {
        let userdata = snapshot.val();
        let uid = firebase.auth().currentUser.uid;
        for (let key in userdata) {
          for (let value in userdata[key]) {
            if (userdata[key][value].sender == uid) {
              alreadyLiked.push(key);
              break;
            }
          }
        }
        resolve(alreadyLiked);
      }).catch((err) => {
        resolve(alreadyLiked);
      })
    });
  }

  getAllMyMatches() {
    return new Promise((resolve) => {
      let myMatchedList = [];
      let myMatchedUsers = [];
      this.firereq.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        let userdata = snapshot.val();
        this.getMyLikedList().then((usersThatIliked) => {
          for (let key in userdata) {
            let userThatlikedMe = userdata[key].sender;
            for (let userThatIliked in usersThatIliked) {
              if (usersThatIliked[userThatIliked] == userThatlikedMe) {
                myMatchedList.push(userThatlikedMe);
                break;
              }
            }
          }
          this.userservice.getallusers().then((users) => {
            for (var j in myMatchedList)
              for (var key in users) {
                if (myMatchedList[j] === users[key].uid) {
                  myMatchedUsers.push(users[key]);
                }
              }
            resolve(myMatchedUsers);
          });
        });
      }).catch((err) => {
        resolve(myMatchedUsers);
      })
    });
  }

  listenForNewLike(userUID) {
    return new Promise(resolve => {
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild
      ('sender').equalTo(userUID).on('child_added', function (snapshot) {
        var myNewMatch = snapshot.val();
        if (myNewMatch) {
          resolve(userUID);
        } else {
          return;
        }
      });
    });
  }
}
