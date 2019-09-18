import { Injectable } from '@angular/core';
import {Events} from 'ionic-angular';
import {connreq} from '../../models/interfaces/request';
import firebase from 'firebase';
import {UserProvider} from '../user/user';


/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestsProvider {
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');
  mywishfriendslist =[];
  userdetails;
  myfriends;
  constructor(public userservice: UserProvider, public events: Events) {
    console.log('Hello RequestsProvider Provider');
  }
  sendrequest(req: connreq){
    var promise = new Promise((resolve,reject) => {
      //allow to send request only if the other not already send request
      this.firereq.child(req.sender).orderByChild
      ('sender').equalTo(req.recipient).once('value', (snapshot)=>{
        let req_already_exist = snapshot.val();
      //if not exist push to firebase
        if (!req_already_exist){
          this.firereq.child(req.recipient).push({
            sender: req.sender
          }).then(()=>{
            this.mywishfriendslist.push(req.recipient);
            resolve({success:true});///send sms to req.recipient
          }).catch((err)=>{
            resolve(err);
          })
        }
      });
    });
    return promise;
  }

  getMyWishFriendsList(){
    return new Promise((resolve,reject) => {
      let myWishFriendsList =[];
      this.firereq.orderByKey().once('value', (snapshot)=>{
        let userdata =snapshot.val();
        let uid = firebase.auth().currentUser.uid;
        for (let key in userdata){
          for(let value in userdata[key]){
            if(userdata[key][value].sender == uid){
              myWishFriendsList.push(key);
              break;
            }
          }

        }
        resolve(myWishFriendsList);
      }).catch((err)=>{
        resolve(myWishFriendsList);
      })
    });
  }
  getmyrequests(){
    return new Promise(resolve => {
      let allmyrequests;
      var myrequests =[];

      this.firereq.child(firebase.auth().currentUser.uid).once('value', (snapshot)=>{
        allmyrequests = snapshot.val();
        myrequests =[];
        for (var i  in allmyrequests){
          myrequests.push(allmyrequests[i].sender);
        }
        this.userservice.getallusers().then((res)=>{
          var allusers = res;
          this.userdetails = [];
          for (var j in myrequests) {
            for (var key in allusers) {
              if (myrequests[j] === allusers[key].uid) {
                this.userdetails.push(allusers[key]);
              }
            }
          }
          resolve(this.userdetails);
          // this.events.publish('gotrequests');
        })
      })
    });
  }

  acceptrequest(buddy){
    var promise = new Promise((reject, resolve)=>{
      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: buddy.uid
      }).then(() => {
        this.firefriends.child(buddy.uid).push({
          uid: firebase.auth().currentUser.uid
        }).then(()=>{
          this.deleterequest(buddy).then(()=>{
            resolve(true);//send a message back
          }).catch((err)=>{
            reject(err);
          })
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
    });
    return promise;
  }

  deleterequest(buddy) {
    var promise = new Promise((reject, resolve)=>{
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild
        ('sender').equalTo(buddy.uid).once('value', (snapshot)=>{
          let tempstore = snapshot.val();
          let somekey = Object.keys(tempstore);
          this.firereq.child (firebase.auth().currentUser.uid).child(somekey[0]).remove().then(()=>{
            resolve(true);
          }).catch((err)=>{
            reject(err);
          })
        }).catch((err)=>{
          reject(err);
        })
      });
    return promise;
  }

  getmyfriends(){
    return new Promise(resolve => {
      let friendsuid = [];
      this.firefriends.child(firebase.auth().currentUser.uid).once('value', (snapshot)=>{
        let allfriends = snapshot.val();
        for (var i in allfriends){
          friendsuid.push(allfriends[i].uid);
        }
      }).then(()=>{
        this.userservice.getallusers().then((users)=>{
          this.myfriends=[];
          for( var j in friendsuid) {
            for (var key in users) {
              if (friendsuid[j] === users[key].uid) {
                this.myfriends.push(users[key]);
              }
            }
          }
          resolve(this.myfriends);
          // this.events.publish('friends');
        })
      }).catch((err)=>{
        alert(err);
      });
    });
  }
}
