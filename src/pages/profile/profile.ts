import {Component, Injectable, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
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
              public modalCtrl: ModalController,public imghandler: ImghandlerProvider) {
    // this.username = this.navParams.get('username');

  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad ProfilePage');
    this.loaduserdetails();

  }

  ionViewWillEnter(){
    // this.loaduserdetails();

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
    // let filters: any = {};
    // filters = this.serviceFilter.getFilters();

    // if (filters == null) {
    //   console.log("nothing here");
    // } else {
    //   console.log("the filters in profile.ts are: " + filters.addictsType);
    // }
    this.navCtrl.push(SearchFriendsPage);
  }

  logout(){
    firebase.auth().signOut().then(() =>{
      this.navCtrl.parent.parent.setRoot(LoginPage);
    })
  }

  editimage() {
    this.navCtrl.parent.parent.setRoot(ChooseAvatarPage);
    // let statusalert = this.alertCtrl.create({
    //   buttons: ['okay']
    // });
    // // // this.imghandler.uploadimage().then((url: any) => {
    //   this.userservice.updateimage(this.aService.img).then((res: any) => {
    //     if (res.success) {
    //
    //       statusalert.setTitle('Updated');
    //       statusalert.setSubTitle('Your profile pic has been changed successfully!!');
    //       statusalert.present();
    //       this.zone.run(() => {
    //         this.avatar = this.aService.img;
    //       })
    //     }
    //   }).catch((err) => {
    //     statusalert.setTitle('Failed');
    //     statusalert.setSubTitle('Your profile pic was not changed');
    //     statusalert.present();
    //   })
    // })
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




