import {Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import {FilterPage} from "../filter/filter";
import {ImghandlerProvider} from '../../providers/imghandler/imghandler';
import {UserProvider} from "../../providers/user/user";
import firebase from 'firebase';
import {LoginPage} from "../login/login";

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
  username: string = '';
  avatar: string;
  displayName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public zone: NgZone, public userservice: UserProvider, public alertCtrl: AlertController) {
    this.username = this.navParams.get('username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter(){
    this.loaduserdetails();
  }

  loaduserdetails(){
    this.userservice.getusersdetails().then((res: any)=>{
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

  }

  logout(){
    firebase.auth().signOut().then(() =>{
      this.navCtrl.parent.parent.setRoot(LoginPage);
    })
  }

  editimage(){

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
