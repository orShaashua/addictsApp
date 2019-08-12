import { Injectable } from '@angular/core';
import {connreq} from "../../models/interfaces/request";
import firebase from "firebase";
import {MatchPage} from "../../pages/match/match";
import {Events} from "ionic-angular";

/*
  Generated class for the LikesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class LikesProvider {
  firereq = firebase.database().ref('/likes');

  constructor(public events:Events) {
    console.log('Hello LikesProvider Provider');
  }
  sendlike(req: connreq){
    var promise = new Promise((resolve,reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender,
      }).then(()=>{
        resolve({success:true});///send sms to req.recipient
      }).catch((err)=>{
        resolve(err);
      })
    });
    return promise;
  }
  getMyLikedList(){
    return new Promise((resolve) => {
      var alreadyLiked = [];
      this.firereq.orderByKey().once('value', (keys)=> {
        var userdata = keys.val();
        for (var key in userdata) {
          for (var value in userdata[key]){
            if(userdata[key][value].sender == firebase.auth().currentUser.uid){
              alreadyLiked.push(key);
            }
          }
        }
        resolve(alreadyLiked);
      });
    });
  }


  addToMyMatchList(user){
    this.events.publish('gotmatch', {user});
  }

}
