import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {FiltersService} from "../../services/FiltersService";
import {UserProvider} from "../../providers/user/user";
import {TabsPage} from "../tabs/tabs";
import {createViewChild} from "@angular/compiler/src/core";
import {Filters} from "../../models/filters.model";
import {Settings} from "../../models/settings.model";


@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  @ViewChild('maxDist') maxDist;
  @ViewChild('addictsType') addictsType;
  @ViewChild('female') female;
  @ViewChild('male') male;
  @ViewChild('meetingType') meetingType;
  filtersFromUser = new Filters();
  ageRange:any={
    upper:35,
    lower:25
  };


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  doneFilter(){
    this.filtersFromUser.addictsType =  this.addictsType.value;
    this.filtersFromUser.maxDist = this.maxDist.value;
    this.filtersFromUser.female = this.female.value;
    this.filtersFromUser.male = this.male.value;
    this.filtersFromUser.ageRangeLower = this.ageRange.lower;
    this.filtersFromUser.ageRangeUpper = this.ageRange.upper;
    this.filtersFromUser.meetingType = this.meetingType.value;
    this.userservice.addFiltersToUser(this.filtersFromUser).then((res: any) => {
      if(res.success){
      } else {
        alert('error : ' + res);
      }
    });
    this.navCtrl.pop();
  }


  loaduserfilters(){
    this.userservice.getusersdetails("filters").then((res: any)=>{

      if (res) {
          this.ageRange.lower = res.ageRangeLower;
          this.ageRange.upper = res.ageRangeUpper;
          this.addictsType.value = res.addictsType;
          this.maxDist.value = res.maxDist;
          this.female.value = res.female;
          this.male.value = res.male;
          this.meetingType.value = res.meetingType;
      }
    });
  }

  ionViewWillEnter(){
    this.loaduserfilters();
  }
}
