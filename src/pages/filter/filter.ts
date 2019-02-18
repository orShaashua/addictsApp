import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  @ViewChild('maxDistance') maxDis;
  @ViewChild('addictsType') addictsType;
  @ViewChild('female') female;
  @ViewChild('men') men;
  ageRange:any ={
    upper:35,
    lower:25
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  doneFilter(){
    alert("the max distanse is: " + this.maxDis.value+"\n"
    + "the addicts type is: " + this.addictsType.value + "\n"
      + "want to see: female- " +this.female.value + " men- "+this.men.value + "\n"
      + "the age Range: "  + this.ageRange.lower + " - " +this.ageRange.upper+ "\n");
  }

}
