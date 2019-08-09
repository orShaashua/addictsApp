import { Injectable } from '@angular/core';
import {connreq} from "../../models/interfaces/request";
import firebase from "firebase";

/*
  Generated class for the LikesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LikesProvider {
  firereq = firebase.database().ref('/likes');
  alreadyLiked = [];
  constructor() {
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
    return new Promise((resolve,reject) => {
      this.firereq.orderByChild('sender: "'+ firebase.auth().currentUser.uid +'"').once('value', (snapshot)=>{
        let userdata =snapshot.val();
        let temparr =[];
        for (var key in userdata){
              temparr.push(key);
        }
        resolve(temparr);
      }).catch((err)=>{
        reject(err);
      })
    });
  }


}
