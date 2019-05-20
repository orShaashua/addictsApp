import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserProvider} from "../../providers/user/user";
import {ProfilepicPage} from "../profilepic/profilepic";
import {TabsPage} from "../tabs/tabs";


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
    let loader = this.loadingCtrl.create({
      content: 'אנא המתן'
    });
    loader.present();
    this.userservice. addsettingstouser(this.addictsType.value,
      this.gender.value,
      this.BirthDate.value.year,
      this.BirthDate.value.month,
      this.BirthDate.value.day,
      this.mentor.value,
      this.about.value).then((res: any) => {
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
    this.userservice.getusersdetails().then((res: any)=>{
      debugger;
      debugger;
      if (res.gender) {
        debugger;
        this.gender.value = res.gender;
        this.addictsType.value = res.addictstype;
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
