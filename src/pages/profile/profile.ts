import {Component, NgZone} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import {FilterPage} from "../filter/filter";
import {UserProvider} from "../../providers/user/user";
import firebase from 'firebase';
import {LoginPage} from "../login/login";
import {SearchFriendsPage} from "../search-friends/search-friends";
import { ModalController } from 'ionic-angular';
import {ChooseAvatarPage} from "../choose-avatar/choose-avatar";
import { FCM } from '@ionic-native/fcm';



/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  filters: any = {};
  avatar: string;
  displayName: string;
  constructor(public plt: Platform, public navCtrl: NavController, public navParams: NavParams,
              public zone: NgZone, public userservice: UserProvider, public alertCtrl: AlertController,
              public fcm:FCM, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad");
    this.plt.ready()
      .then(() => {
        if (this.plt.is('cordova')) {
          // this.subscribeToTopic();
          this.fcm.getToken().then(token => {
            this.saveToken(token);
            this.fcm.onNotification().subscribe(data => {
              if (data.wasTapped) {
                console.log("Received in background");
              } else {
                console.log("Received in foreground");
              }
              let alert = this.alertCtrl.create({
                title: data.title,
                subTitle: data.body,
                buttons: ['ok']
              });
              alert.present();
            });
            this.fcm.onTokenRefresh().subscribe(token => {
              this.saveToken(token);
            });
          }).catch((err) => {
          });

          // this.unsubscribeFromTopic();
        }
      })
  }
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  saveToken(token) {
      this.userservice.addUserFCMToken(token).then((res: any)=>{
        if(!res.success) {
          console.log("failed to add user token to firebase");
        }
      });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

  ionViewDidEnter() {
      console.log('ionViewDidEnter ProfilePage');
      this.loaduserdetails();
  }

  // getPosition(): Promise<any>
  // {
  //   return new Promise((resolve, reject) => {
  //
  //     navigator.geolocation.getCurrentPosition(resp => {
  //
  //         resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
  //       },
  //       err => {
  //         reject(err);
  //       });
  //   });
  // }

  loaduserdetails(){
    this.userservice.getusersdetails(null).then((res: any)=>{
      this.displayName = res.displayName;
      this.zone.run(()=>{
        this.avatar = res.photoURL;
      })
    })
  }

  goToSettings(){
    this.navCtrl.push(SettingsPage);
  }

  goToFilterPage(){
    this.navCtrl.push(FilterPage);
  }

  goToSearchFriends(){
    this.navCtrl.push(SearchFriendsPage);
  }

  logout(){
    firebase.auth().signOut().then(() =>{
      this.navCtrl.parent.parent.setRoot(LoginPage);
    })
  }

  editimage() {
    this.navCtrl.push(ChooseAvatarPage);
  }

  editname(){
    let statusalert = this.alertCtrl.create({
      buttons:['okay']
    });
    let alert = this.alertCtrl.create({
      title: 'Edit Nickname',
      inputs: [{
        name: 'nickname',
        placeholder: 'שם משתמש'
      }],
      buttons: [{
        text: 'ביטול',
        role: 'cancel',
        handler: data => {

        }
      },
        {
          text: 'ערוך',
          handler: data => {
            if(data.nickname){
              this.userservice.updatedisplayname(data.nickname).then((res: any) => {
                if(res.success) {
                  statusalert.setTitle('עודכן');
                  statusalert.setSubTitle('שם המשתמש עודכן בהצלחה');
                  statusalert.present();
                  this.zone.run(() => {
                    this.displayName = data.nickname;
                  })
                }
                else {
                  statusalert.setTitle('Failed');
                  statusalert.setSubTitle('שם המשתמש לא עודכן');
                  statusalert.present();
                }
              });
            }
        }
      }]
    });
    alert.present();
  }
}




