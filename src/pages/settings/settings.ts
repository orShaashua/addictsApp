import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProfilePage} from "../profile/profile";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {UserProvider} from "../../providers/user/user";
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
  myPhoto: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private camera: Camera,
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
    alert("the addicts type is: " + this.addictsType.value + "\n"
      + "the gender: " +this.gender.value+ "\n"
      + "the Birth Date: year: "  + this.BirthDate.value.year+ " mounth: "+this.BirthDate.value.month + " day: "+this.BirthDate.value.day +"\n"
      +"mentor? " +this.mentor.value +"\n"
      + "about me: " +this.about.value +"\n");
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
        this.navCtrl.push(TabsPage);
      } else {
        loader.dismissAll();
        alert('error: ' + res);
      }
    });
    // this.navCtrl.push(ProfilePage);
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      alert(err);
    });
  }
}
