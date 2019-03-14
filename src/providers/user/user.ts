import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/chatusers');
  constructor(public afirauth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }

  adduser(newuser){
   return new Promise((resolve, reject) => {
      this.afirauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afirauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,

        }).then(() => {
          this.firedata.child(this.afirauth.auth.currentUser.uid).set({
            uid: this.afirauth.auth.currentUser.uid,
            displayName: newuser.displayName,

          }).then(()=>{
            resolve({success: true});
          }).catch((err)=>{
            alert(err);
            // reject(err);
          })
        }).catch((err)=>{
          alert(err);
          // reject(err);
        })
      }).catch((err)=>{
        alert(err);
        // reject(err);
      })
    });
    // return promise;
  }
}
