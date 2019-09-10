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
  lat: number;
  lng: number;

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition( resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          console.log("the error in getPosition is " + JSON.stringify(err));
        }, { timeout: 10000 });
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  async doneSettings(){
    let lng = '';
    let lat = '';
    console.log('hi done 1');
    try {
      const pos = await this.getPosition();
      lng = pos.lng;
      lat = pos.lat;
      console.log('hi' + " " + lng + " and " + lat);

      this.settingsFromUser.gender = this.gender.value;
      this.settingsFromUser.addictsType = this.addictsType.value;
      this.settingsFromUser.mentor = this.mentor.value;
      this.settingsFromUser.bdayYear = this.BirthDate.value.year;
      this.settingsFromUser.bdayMonth = this.BirthDate.value.month;
      this.settingsFromUser.bdayDay = this.BirthDate.value.day;
      this.settingsFromUser.about = this.about.value;
      this.settingsFromUser.longLocation = lng;
      this.settingsFromUser.latLocation = lat;

      let loader = this.loadingCtrl.create({
        content: 'אנא המתן'
      });
      loader.present();
      this.userservice.addsettingstouser(this.settingsFromUser).then((res: any) => {

        loader.dismiss();
        if (res.success) {
          this.navCtrl.push(TabsPage);
        } else {
          loader.dismissAll();
          alert('error: ' + res);
        }
      });

      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      // });
    } catch(err){
      console.log("the error is " + err);

    }

  }


  loadusersettings(){

    this.userservice.getusersdetails("settings").then((res: any)=>{

      if (res) {
        this.gender.value = res.gender;
        this.addictsType.value = res.addictsType;
        this.mentor.value = res.mentor;
        this.BirthDate.setValue(new Date(res.bdayYear + "-" + res.bdayMonth + "-" + res.bdayDay).toISOString());
        this.about.value = res.description;
      }
    });

  }

  ionViewWillEnter(){
    this.loadusersettings();
  }
}
