import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import firebase from "firebase";
import {google} from "@agm/core/services/google-maps-types";
/**
 * Generated class for the DistressButtonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distress-buttone',
  templateUrl: 'distress-buttone.html',
})
export class DistressButtonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userservice : UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistressButtonePage');
  }
  sendHelpMessage(){
    this.userservice.getPosition().then((pos)=> {
      //   alert(pos);
      // var pos = "תל אביב, רחוב אבן גבירול, 27";
      // var buildingNum;
      // var streetName;
      // if (navigator.geolocation) {
      //   let geocoder = new google.maps.Geocoder();
      //   let latlng = new google.maps.LatLng(pos.lat, pos.lng);
      //   let request = { latLng: latlng };
      //   geocoder.geocode(request, (results, status) => {
      //     if (status == google.maps.GeocoderStatus.OK) {
      //       let result = results[0];
      //       let rsltAdrComponent = result.address_components;
      //       let resultLength = rsltAdrComponent.length;
      //       if (result != null) {
      //         var buildingNum = rsltAdrComponent.find(x => x.types == 'street_number').long_name;
      //         var streetName = rsltAdrComponent.find(x => x.types == 'route').long_name;
      //         // var city = rsltAdrComponent.find(x => x.types == 'locality').long_name;
      //       } else {
      //         alert("No address available!");
      //       }
      //     }
      //   });
      // }
      // var address = streetName + " " + buildingNum + ",";
      var address = "אבן גבירול 7 תל אביב";
      var addMessage = firebase.functions().httpsCallable('sendHlepMessage');
      addMessage({text: address}).then(function (result) {
        // Read result of the Cloud Function.
        //         var sanitizedMessage = result.data.text;
        //         // ...
        alert("מיקומך נשלח לכל המשתמשים");
      });
    });
  }

}
