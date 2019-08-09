import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';
import {Filters} from "../../models/filters.model";
import {Settings} from "../../models/settings.model";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/users');
  // firedata1 = firebase.database().ref('/users/uid');
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
          addictsType: settings.addictsType,
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
          ageRangeLower: filters.ageRangeLower,
          ageRangeUpper: filters.ageRangeUpper,
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
    var query = firebase.database().ref("users/settings");
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.child("gender").key;
          console.log("hi the key here is =" + key);
          // childData will be the actual contents of the child
          var childData = childSnapshot.child("gender").val();
          console.log("hi the childData here is =" + childData);
        });
      });

    const data1234 = this.firedata.child('settings');
        console.log("hi the data1234 is = " + data1234.toString());
        var promise = new Promise ((resolve, reject)=>{
          this.firedata.orderByChild("settings").once('value', (snapshot)=>{
            // console.log("flag1 = " + snapshot.val().addictsType);
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

              var datas = snapshot.child("settings").child("addictsType").val();

              var firstname = child.val().gender;
              console.log("hi the val is = " + datas);
              // var lastname=child.val().lastname;
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
        } catch (err) {
          // reject(err);
        }
      })
    }
  }

  getMySearchFriends(){
    return new Promise((resolve, reject) => {
      let settingsFromUser = new Settings();
      let result =[];
      this.getusersdetails("settings").then((res: any)=>{
        if (res) {
          settingsFromUser = res;
          let gender = "";
          let currentYear = (new Date()).getFullYear();
          this.getUsersMatchedToMyFilter().then((users: any)=>{
            for (let user in users){
              let details = users[user]["filters"];
              if (!details){
                result.push(users[user]);
                continue;
              }
              if(details.female == true && details.male == true){
                gender = "both"
              } else if(details.female == true){
                gender = "female"
              } else {
                gender = "male"
              }

              if(settingsFromUser.addictsType == details.addictsType
                && (settingsFromUser.gender == gender || gender == "both")
                && (currentYear - settingsFromUser.bdayYear >=  details.ageRangeLower
                  && currentYear - settingsFromUser.bdayYear <=  details.ageRangeUpper)){
                result.push(users[user]);
              }
            }
            resolve(result);
          });
        }
      });
    });
  }



  //return the users who match my filter
  getUsersMatchedToMyFilter(){
    return new Promise((resolve, reject) => {
      let filtersFromUser = new Filters();
      //this is suppose to work, for shula it doesnt and for Or it does. so in the mean time im doing a demo filter
      this.getusersdetails("filters").then((res: any)=>{
        if (res) {
          filtersFromUser.addictsType = res.addictsType;
          filtersFromUser.maxDist = res.maxDist;
          filtersFromUser.female =res.female;
          filtersFromUser.male = res.male ;
          filtersFromUser.ageRangeLower =res.ageRangeLower;
          filtersFromUser.ageRangeUpper = res.ageRangeUpper;
          filtersFromUser.meetingType = res.meetingType;
          let gender = "";
          let currentYear = (new Date()).getFullYear();
          if(filtersFromUser.female == true && filtersFromUser.male == true){
            gender = "both"
          } else if(filtersFromUser.female == true){
            gender = "female"
          } else {
            gender = "male"
          }
          let result =[];
          this.getallusers().then((users: any)=>{
            try {
              if (firebase.auth().currentUser.uid != null) {
                for (let user in users) {

                  let details = users[user]["settings"];
                  if(details.addictsType == filtersFromUser.addictsType
                    && (details.gender == gender || gender == "both")
                    && (currentYear - details.bdayYear >=  filtersFromUser.ageRangeLower
                      && currentYear - details.bdayYear <=  filtersFromUser.ageRangeUpper)){
                      result.push(users[user])
                  }
                  // console.log(details.gender);
                  // result.push(details);
                }
              }
            }catch (err) {
              reject(err);
            }
            resolve(result);
          });
        }else {
            this.getallusers().then((users: any)=>{
              resolve(users);
            });
        }
      });
    });
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
