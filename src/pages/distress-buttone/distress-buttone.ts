import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import { AngularFireFunctions } from '@angular/fire/functions'

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


  constructor(private fns: AngularFireFunctions,
              public navCtrl: NavController, public navParams: NavParams, private userservice : UserProvider ) {
  }
  // let options: NativeGeocoderOptions = {
  //   useLocale: true,
  //   maxResults: 5
  // };
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
      var address = "תל אביב, רחוב אבן גבירול, 27";
      // let geocoder =  new google.maps.Geocoder;
      // let latlng = {lat: pos.lat, lng: pos.lng};
      // geocoder.geocode({'location': latlng}, (results, status) => {
      //   console.log(results); // read data from here
      //   console.log(status);
      // });

      // this.getAddress().then((realadd:any)=>{
      //   alert(realadd);
        var addMessage = this.fns.httpsCallable('sendHelpMessage');
        addMessage({text: address}).toPromise()
          .then(() => {
            alert("מיקומך נשלח לכל המשתמשים")
          })
          .catch(err => {
            console.error({ err });
          });
      // });
        // .then(function (result) {
        // Read result of the Cloud Function.
        //         var sanitizedMessage = result.data.text;
        //         // ...
        //
      // });
    });
  }

  // getAddress(): Promise<any>
  // {
  //   // return new Promise((resolve) => {
  //   //   let options: NativeGeocoderOptions = {
  //   //     useLocale: true,
  //   //     maxResults: 5
  //   //   };
  //   //   this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818, options)
  //   //     .then((result: NativeGeocoderResult[]) => {
  //   //       console.log(JSON.stringify(result[0]))
  //   //       resolve(JSON.stringify(result[0]));
  //   //     })
  //   //     .catch((error: any) => alert(error));
  //   // });
  // }

}
