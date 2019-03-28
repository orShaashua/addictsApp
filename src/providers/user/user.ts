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

  firedata = firebase.database().ref('/users');
  constructor(public afirauth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }

  addsettingstouser(addictsType, gender, bdayY, bdayM, bdayD, mentor, about){
    return new Promise((resolve, reject) => {
      this.afirauth.auth.currentUser.updateProfile({
        displayName: this.afirauth.auth.currentUser.displayName,
        photoURL: this.afirauth.auth.currentUser.photoURL

      }).then(()=> {
        this.firedata.child(this.afirauth.auth.currentUser.uid).set({
          displayName: this.afirauth.auth.currentUser.displayName,
          photoURL: this.afirauth.auth.currentUser.photoURL,
          uid: this.afirauth.auth.currentUser.uid,
          addictstype: addictsType,
          gender: gender,
          bdayYear: bdayY,
          bdayMonth: bdayM,
          bdayDay: bdayD,
          mentor: mentor,
          description: about
        }).then(() => {
          resolve({success: true});
        }).catch((err)=>{
          alert(err);
          // reject(err);
        })
        }).catch((err)=>{
        alert(err);
        // reject(err);
      })
    });
  }

  adduser(newuser,loader){
   return new Promise((resolve, reject) => {
      this.afirauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afirauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL:'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
        }).then(() => {
          this.firedata.child(this.afirauth.auth.currentUser.uid).set({
            uid: this.afirauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL:'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e',
          }).then(()=>{
            resolve({success: true});
          }).catch((err)=>{
            loader.dismissAll();
            alert(err);
            // reject(err);
          })
        }).catch((err)=>{
          loader.dismissAll();
          alert(err);
          // reject(err);
        })
      }).catch((err)=>{
        loader.dismissAll();
        alert(err);
        // reject(err);
      })
    });
    // return promise;
  }

  passwordreset(email) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({success: true});
      }).catch((err) => {
        alert(err);
        // reject(err);
      })
    })
  }

  getallusers(){
    var promise = new Promise ((resolve, reject)=>{
      this.firedata.orderByChild('uid').once('value', (snapshot)=>{
        let userdata =snapshot.val();
        let temparr =[];
        for (var key in userdata){
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err)=>{
        reject(err);
      })
    });
    return promise;
  }

  getusersdetails() {
    //accessing the particular user based on uid from the user collection and returning it back to the calling function
      return new Promise((resolve, reject) =>{
        this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot)=> {
          resolve(snapshot.val());
        }).catch((err) => {
            reject(err);
        })
      })
    }



  updatedisplayname(newname){
    return new Promise((resolve, reject) => {
      this.afirauth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.afirauth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.afirauth.auth.currentUser.photoURL,
          uid: this.afirauth.auth.currentUser.uid
        }).then(() => {
          resolve ({ success : true});
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
    })
  }
}
