import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserProvider} from "../../providers/user/user";
import {TabsPage} from "../tabs/tabs";
import {Settings} from "../../models/settings.model";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {


  @ViewChild('addictsType') addictsType;
  @ViewChild('gender') gender;
  @ViewChild('BirthDate') BirthDate;
  @ViewChild('mentor') mentor;
  @ViewChild('about') about;
  settingsFromUser = new Settings();
  credentialsForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,
              public userservice: UserProvider,
              public loadingCtrl: LoadingController){
    this.credentialsForm = this.formBuilder.group({

      addictsType: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      gender: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      BirthDate: [
        '', Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  doneSettings(){

    this.settingsFromUser.gender = this.gender.value;
    this.settingsFromUser.addictsType = this.addictsType.value;
    this.settingsFromUser.mentor = this.mentor.value;
    this.settingsFromUser.bdayYear = this.BirthDate.value.year;
    this.settingsFromUser.bdayMonth = this.BirthDate.value.month;
    this.settingsFromUser.bdayDay = this.BirthDate.value.day;
    this.settingsFromUser.about = this.about.value;

    let loader = this.loadingCtrl.create({
      content: 'אנא המתן'
    });
    loader.present();
    this.userservice.addsettingstouser(this.settingsFromUser).then((res: any) => {
        loader.dismiss();
        if(res.success){
          this.navCtrl.setRoot(TabsPage);
        } else {
          loader.dismissAll();
          alert('error: ' + res);
        }
    });
  }


  loadusersettings(){

    this.userservice.getusersdetails("settings").then((res: any)=>{

      if (res) {
        console.log("the gender is :" + this.settingsFromUser.gender);
        this.gender.value = this.settingsFromUser.gender;
        this.addictsType.value = this.settingsFromUser.addictsType;
        this.mentor.value = this.settingsFromUser.mentor;
        this.BirthDate.setValue(new Date(this.settingsFromUser.bdayYear
          + "-" + this.settingsFromUser.bdayMonth + "-" + this.settingsFromUser.bdayDay).toISOString());
        this.about.value = this.settingsFromUser.about;
      }
    });

  }

  ionViewWillEnter(){
    this.loadusersettings();
  }
}
