import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {FiltersService} from "../../services/FiltersService";
import {UserProvider} from "../../providers/user/user";
import {TabsPage} from "../tabs/tabs";
import {createViewChild} from "@angular/compiler/src/core";

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
  @ViewChild('maxDist') maxDist;
  @ViewChild('addictsType') addictsType;
  @ViewChild('female') female;
  @ViewChild('male') male;
  @ViewChild('meetingType') meetingType;

  ageRange:any={
    upper:35,
    lower:25
  };

  filters: any = {
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public serviceFilter: FiltersService, public userservice: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  doneFilter(){
    this.userservice.addFiltersToUser(
      this.addictsType.value,
      this.maxDist.value,
      this.female.value,
      this.male.value,
      this.ageRange.lower,
      this.ageRange.upper,
      this.meetingType.value,
      ).then((res: any) => {
      // loader.dismiss();
      if(res.success){
        // this.navCtrl.setRoot(TabsPage);
      } else {
        // loader.dismissAll();
        alert('error: ' + res);
      }
    });
    // this.serviceFilter.setFilters(this.filters);
    this.navCtrl.setRoot(TabsPage)
  }


  loaduserfilters(){
    this.userservice.getusersdetails("filters").then((res: any)=>{
      if (res) {
          this.ageRange.lower = res.ageRangelower;
          this.ageRange.upper = res.ageRangeupper;
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
