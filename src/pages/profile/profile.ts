import {Component, Injectable, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import {FilterPage} from "../filter/filter";
import {ImghandlerProvider} from '../../providers/imghandler/imghandler';
import {UserProvider} from "../../providers/user/user";
import firebase from 'firebase';
import {LoginPage} from "../login/login";
import {SearchFriendsPage} from "../search-friends/search-friends";
import { ModalController } from 'ionic-angular';
import { MatchPage } from '../match/match';
import {ChooseAvatarPage} from "../choose-avatar/choose-avatar";
import {LikesProvider} from "../../providers/likes/likes";




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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public zone: NgZone, public userservice: UserProvider, public alertCtrl: AlertController,
              public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
    // this.username = this.navParams.get('username');pos.lat, pos.lng

  }

  ionViewDidEnter() {
      console.log('ionViewDidLoad ProfilePage');
      this.loaduserdetails();
  }

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

  presentModal() {
    let modal = this.modalCtrl.create(MatchPage);
    modal.present();
    // this.sim.getSimInfo().then(
    //   (info) => alert( info),
    //   (err) => alert( err)
    // );
  }
}




