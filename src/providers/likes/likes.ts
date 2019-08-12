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
        // this.mywishfriendslist.push(req.recipient);
        resolve({success:true});///send sms to req.recipient
      }).catch((err)=>{
        resolve(err);
      })
    });
    return promise;
  }
  getMyLikedList(){
    return new Promise((resolve) => {
      let alreadyLiked =[];
      this.firereq.orderByKey().once('value', (snapshot)=>{
        let userdata =snapshot.val();
        let uid = firebase.auth().currentUser.uid;
        debugger;
        for (let key in userdata){
          for(let value in userdata[key]){
              if(userdata[key][value].sender == uid){
                alreadyLiked.push(key);
                break;
            }
          }

        }
        resolve(alreadyLiked);
      }).catch((err)=>{
        resolve(alreadyLiked);
      })
    });
  }

  getAllMyMatches(){
    return new Promise((resolve) => {
      var myMatches =[];
      this.firereq.child(firebase.auth().currentUser.uid).once('value', (snapshot)=>{
        let userdata =snapshot.val();
        debugger;
        for (var key in userdata){
          myMatches.push(key);
        }
        resolve(myMatches);
      }).catch((err)=>{
        resolve(myMatches);
      })
    });
  }


}
