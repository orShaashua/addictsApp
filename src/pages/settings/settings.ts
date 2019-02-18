import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
  constructor(public navCtrl: NavController, public navParams: NavParams){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  doneSettings(){
    alert("the addicts type is: " + this.addictsType.value + "\n"
      + "the gender: " +this.gender.value+ "\n"
      + "the Birth Date: year: "  + this.BirthDate.value.year+ " mounth: "+this.BirthDate.value.month + " day: "+this.BirthDate.value.day +"\n"
      +"mentor? " +this.mentor.value);
  }
}
