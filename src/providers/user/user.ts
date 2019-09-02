import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';
import {Filters} from "../../models/filters.model";
import {Settings} from "../../models/settings.model";
import {AlertController, LoadingController} from "ionic-angular";
import {Mutex, MutexInterface} from 'async-mutex';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {


  firedata = firebase.database().ref('/users');
  alreadyEnteredToSearchFriendsPage = false;

  // firedata1 = firebase.database().ref('/users/uid');
  constructor(public afirauth: AngularFireAuth, public loadingCtrl: LoadingController) {
    console.log('Hello UserProvider Provider');
  }

  addsettingstouser(settings) {
    return new Promise((resolve, reject) => {
      this.afirauth.auth.currentUser.updateProfile({}).then(() => {
        // this.firedata.child("settings")
        this.firedata.child(this.afirauth.auth.currentUser.uid).child("settings").set({
          addictsType: settings.addictsType,
          gender: settings.gender,
          mentor: settings.mentor,
          bdayDay: settings.bdayDay,
          bdayMonth: settings.bdayMonth,
          bdayYear: settings.bdayYear,
          description: settings.about,
          longLocation: settings.longLocation,
          latLocation: settings.latLocation

        }).then(() => {
          resolve({success: true});
        }).catch((err) => {
          alert(err);
          // reject(err);
        })
      }).catch((err) => {
        alert(err);
        // reject(err);
      })
    });
  }

  addFiltersToUser(filters) {
    return new Promise((resolve, reject) => {
      this.afirauth.auth.currentUser.updateProfile({
        // displayName: this.afirauth.auth.currentUser.displayName,
        // photoURL: this.afirauth.auth.currentUser.photoURL

      }).then(() => {
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
        }).catch((err) => {
          alert(err);
          // reject(err);
        })
      }).catch((err) => {
        alert(err);
        // reject(err);
      })
    });
  }

  adduser(newuser, loader) {
    return new Promise((resolve, reject) => {
      this.afirauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afirauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
        }).then(() => {
          this.firedata.child(this.afirauth.auth.currentUser.uid).set({
            uid: this.afirauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e',
          }).then(() => {
            resolve({success: true});
          }).catch((err) => {
            alert(err);
            setTimeout(() => {
            }, 0);
            // reject(err);
          })
        }).catch((err) => {
          alert(err);
          setTimeout(() => {
            loader.dismiss();
          }, 0);
          // reject(err);
        })
      }).catch((err) => {
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

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    });
    return promise;
  }


  getusersdetails(node) {
    //accessing the particular user based on uid from the user collection and returning it back to the calling function
    // this.afirauth.auth.currentUser
    if (node == null) {
      return new Promise((resolve, reject) => {
        try {
          if (firebase.auth().currentUser.uid != null) {
            this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
              resolve(snapshot.val());
            }).catch((err) => {
              reject(err);
            });
          }
        } catch (e) {
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

  createGender(details) {
    //check what happens when theyre both false
    if (details.female && details.male) {
      return "both"
    }
    if (details.female) {
      return "female"
    }
    return "male"
  }

  async getMySearchFriends() {
    let settingsFromUser = new Settings();
    let result = [];
    try {
      const resSettingsOfUser = await this.getusersdetails("settings");
      if (!resSettingsOfUser) {
        //error
        return;
      }
      // @ts-ignore
      settingsFromUser = resSettingsOfUser;
      const users = await this.getUsersMatchedToMyFilter();
      for (let user in users) {
        if (users[user].uid === firebase.auth().currentUser.uid) {
          //don't add myself
          continue;
        }
        let details = users[user]["filters"];
        if (!details) {
          result.push(users[user]);
          continue;
        }
        const gender = this.createGender(details);
        let currentYear = (new Date()).getFullYear();
        if (settingsFromUser.addictsType == details.addictsType
          && (settingsFromUser.gender == gender || gender == "both")
          && (currentYear - settingsFromUser.bdayYear >= details.ageRangeLower
            && currentYear - settingsFromUser.bdayYear <= details.ageRangeUpper)) {
          result.push(users[user]);
        }
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  }

//taken from https://www.html5rocks.com/en/tutorials/geolocation/trip_meter/
  async checkDistance(otherLatLocation, otherLongLocation, maxDist) {
    // return new Promise((resolve, reject) => {
    let settingsFromUser = new Settings();
    try {
      const resSettingOfUser = await this.getusersdetails("settings");
      if (!resSettingOfUser) {
        return;
      }
      // @ts-ignore
      settingsFromUser = resSettingOfUser;
      let myLat = +settingsFromUser.latLocation;
      let myLng = +settingsFromUser.longLocation;
      if ((myLat == otherLatLocation) && (myLng == otherLongLocation)) {
        console.log("same place currently");
        return true;
      }
      var R = 6371; // km
      var dLat = (otherLatLocation - myLat) * (Math.PI / 180);
      var dLon = (otherLongLocation - myLng) * (Math.PI / 180);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(myLat * (Math.PI / 180)) * Math.cos(otherLatLocation * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distance = R * c;
      console.log("the distance is " + distance);
      return distance <= maxDist;
    } catch (err) {
      console.log(err);
    }
  }

  createFilters(resUserDetails) {
    const {addictsType, maxDist, female, male, ageRangeLower, ageRangeUpper, meetingType} = resUserDetails;
    let filtersFromUser = new Filters();
    filtersFromUser.addictsType = addictsType;
    filtersFromUser.maxDist = maxDist;
    filtersFromUser.female = female;
    filtersFromUser.male = male;
    filtersFromUser.ageRangeLower = ageRangeLower;
    filtersFromUser.ageRangeUpper = ageRangeUpper;
    filtersFromUser.meetingType = meetingType;
    return filtersFromUser;
  }


//return the users who match my filter
  async getUsersMatchedToMyFilter() {
    try {
      const resUserDetails = await this.getusersdetails("filters");
      const users = await this.getallusers();
      console.log("the users are = " + users);
      if (!resUserDetails) {
        return users;
      }
      if (!firebase.auth().currentUser.uid) {
        return;
      }
      // @ts-ignore
      return users.filter(async (user) => {
        if (user.uid === firebase.auth().currentUser.uid) {
          return false;
        }
        let details = user.settings;
        const filtersFromUser = this.createFilters(resUserDetails);
        const resDistance = await this.checkDistance(+details.latLocation, +details.longLocation, +filtersFromUser.maxDist);
        if (!resDistance) {
          return false;
        }
        console.log("the answer is flag = " + resDistance.toString());
        const currentYear = (new Date()).getFullYear();
        const gender = this.createGender(filtersFromUser);
        if (details.addictsType == filtersFromUser.addictsType
          && (details.gender == gender || gender == "both")
          && (currentYear - details.bdayYear >= filtersFromUser.ageRangeLower)
          && (currentYear - details.bdayYear <= filtersFromUser.ageRangeUpper)) {
          return true;
        }
      });
    } catch (err) {
      console.log(err)
    }
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
  //update location every time the user goes into the app
  async updateLocation() {
    try {
      const coord = await this.getPosition();
      console.log(coord.lat + " hi and " + coord.lng);
      //alert(coord.lat + " hi and " + coord.lng);
      await this.afirauth.auth.currentUser.updateProfile({});
      this.firedata.child(firebase.auth().currentUser.uid).child('settings').update({
        latLocation: coord.lat,
        longLocation: coord.lng,
      }).then(() => {
        return true;
      }).catch((err) => {
        alert(err);
      })
    }catch(err){
      console.log(err);
    }
  }


  updatedisplayname(newname) {
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
          resolve({success: true});
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
  }

  updateimage(imageurl) {
    return new Promise((resolve, reject) => {
      this.afirauth.auth.currentUser.updateProfile({
        displayName: this.afirauth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() => {
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

  getUserStatus() {
    return this.alreadyEnteredToSearchFriendsPage;
  }

  setUserStatus(status) {
    this.alreadyEnteredToSearchFriendsPage = status;
  }
}
