import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {FiltersService} from "../../services/FiltersService";
import {UserProvider} from "../../providers/user/user";
import {TabsPage} from "../tabs/tabs";

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
  @ViewChild('male') male;
  ageRange:any ={
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
    debugger;
    alert("the max distanse is: " + this.maxDis.value+"\n"
    + "the addicts type is: " + this.addictsType.value + "\n"
      + "want to see: female- " +this.female.value + " men- "+this.male.value + "\n"
      + "the age Range: "  + this.ageRange.lower + " - " +this.ageRange.upper+ "\n");

    this.filters = {
      maxDis: this.maxDis.value,
      addictsType: this.addictsType.value,
      femaleValue: this.female.value,
      maleVale: this.male.value,
      ageRangeLower: this.ageRange.lower,
      ageRangeUpper: this.ageRange.upper
    };
    debugger;
    this.userservice.addFiltersToUser(this.addictsType.value,
      this.maxDis.value,
      this.female.value,
      this.male.value,
      this.ageRange.lower,
      this.ageRange.upper).then((res: any) => {
      // loader.dismiss();
      if(res.success){
        // this.navCtrl.setRoot(TabsPage);
      } else {
        // loader.dismissAll();
        alert('error: ' + res);
      }
    });
    this.serviceFilter.setFilters(this.filters);
    this.navCtrl.setRoot(TabsPage)
  }


  loaduserfilters(){
    debugger;
    this.userservice.getusersdetails("filters").then((res: any)=>{
      if (res) {
          this.addictsType = res.addictsType;
          this.maxDis.value = res.maxDis;
          this.female.value = res.female;
          this.male.value = res.male;
          this.ageRange.lower = res.ageRangelower;
          this.ageRange.upper = res.ageRangeupper;
      }
    });

  }

  ionViewWillEnter(){
    this.loaduserfilters();
  }

}
