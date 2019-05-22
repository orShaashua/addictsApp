import {Injectable, ViewChild} from '@angular/core';
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

  addsettingstouser(settings){
    return new Promise((resolve, reject) => {
      this.afirauth.auth.currentUser.updateProfile({
        // displayName: this.afirauth.auth.currentUser.displayName,
        // photoURL: this.afirauth.auth.currentUser.photoURL

      }).then(()=> {
        // this.firedata.child("settings")
        this.firedata.child(this.afirauth.auth.currentUser.uid).child("settings").set({
          // displayName: this.afirauth.auth.currentUser.displayName,
          // photoURL: this.afirauth.auth.currentUser.photoURL,
          // uid: this.afirauth.auth.currentUser.uid,
          addictstype: settings.addictsType,
          gender: settings.gender,
          mentor: settings.mentor,
          bdayDay: settings.bdayDay,
          bdayMonth: settings.bdayMonth,
          bdayYear: settings.bdayYear,
          description: settings.about
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

  addFiltersToUser(filters){
    return new Promise((resolve, reject) => {
      this.afirauth.auth.currentUser.updateProfile({
        // displayName: this.afirauth.auth.currentUser.displayName,
        // photoURL: this.afirauth.auth.currentUser.photoURL

      }).then(()=> {
        this.firedata.child(this.afirauth.auth.currentUser.uid).child("filters").set({
          // displayName: this.afirauth.auth.currentUser.displayName,
          // photoURL: this.afirauth.auth.currentUser.photoURL,
          // uid: this.afirauth.auth.currentUser.uid,
          addictsType: filters.addictsType,
          maxDist: filters.maxDist,
          female: filters.female,
          male: filters.male,
          ageRangelower: filters.ageRangeLower,
          ageRangeupper: filters.ageRangeUpper,
          meetingType: filters.meetingType
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
            alert(err);
            setTimeout(() => {
            }, 0);
            // reject(err);
          })
        }).catch((err)=>{
          alert(err);
          setTimeout(() => {
            loader.dismiss();
          }, 0);
          // reject(err);
        })
      }).catch((err)=>{
        alert(err);
        setTimeout(() => {
          loader.dismiss();
        }, 0);
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

  getFilterUsers(userDetails){

    var promise = new Promise ((resolve, reject)=>{
      this.firedata.orderByChild('uid').once('value', (snapshot)=>{
        let filteredusersdata = [];
        //         // let temparr =[];
        //         // for (var key in userdata){
        //         //   temparr.push(userdata[key]);
        //         // }
        let gender = "";
        let currentYear = (new Date()).getFullYear();
        if(userDetails.femaleValue == true && userDetails.maleVale == true){
          gender = "both"
        } else if(userDetails.femaleValue == true){
          gender = "female"
        } else {
          gender = "male"
        }
        snapshot.forEach(function(child) {
          if(child.val().addictstype == userDetails.addictsType
            && (child.val().gender == gender || gender == "both")
            && (child.val().bdayYear - currentYear > userDetails.ageRange.lower
              && child.val().bdayYear - currentYear < userDetails.ageRange.upper)){
            filteredusersdata.push(child)
          }

          var datas = child.val();

          var firstname=child.val().firstname;
          console.log(firstname);
          var lastname=child.val().lastname;
        });
        resolve(filteredusersdata);
      }).catch((err)=>{
        reject(err);
      })
    });
    return promise;
  }

  getusersdetails(node) {
    //accessing the particular user based on uid from the user collection and returning it back to the calling function
    // this.afirauth.auth.currentUser
    if(node == null){
      return new Promise((resolve, reject) =>{
        try {
          if (firebase.auth().currentUser.uid != null) {
            this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
              resolve(snapshot.val());
            }).catch((err) => {
              reject(err);
            });
          }
        }catch(e){
          console.log("d");
        }
      })
    } else {
      return new Promise((resolve, reject) => {
        try {
          if (firebase.auth().currentUser.uid != null) {
            this.firedata.child(firebase.auth().currentUser.uid).child(node).once('value', (snapshot) => {
              resolve(snapshot.val());
            }).catch((err) => {
              reject(err);
            });
          }
        } catch (e) {

        }
      })
    }
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

  updateimage(imageurl){
    return new Promise((resolve, reject)=>{
      this.afirauth.auth.currentUser.updateProfile({
        displayName: this.afirauth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(()=>{
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.afirauth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
            resolve({success: true})
          }).catch((err) => {
            reject(err);
          })
      }).catch((err) => {
        reject(err);
      })
    })
  }
}
