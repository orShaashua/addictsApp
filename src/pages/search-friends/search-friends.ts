import { Component,EventEmitter } from '@angular/core';
import {IonicPage, NavParams,} from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import firebase from 'firebase';
import {UserProvider} from "../../providers/user/user";
import {Filters} from "../../models/filters.model";
/**
 * Generated class for the SearchFriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-friends',
  templateUrl: 'search-friends.html',
})
export class SearchFriendsPage {

  ready = false;
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
    like: {
      backgroundColor: '#28e93b'
    },
    dislike: {
      backgroundColor: '#e92828'
    }
  };

  images=["https://media.vogue.in/wp-content/uploads/2017/12/2017-01-2-disha-patani-hairstyles-makeup-vogue-india.jpg",
    "https://spiderimg.amarujala.com/assets/images/2017/11/06/750x506/anushka-shetty_1509948439.jpeg",
    "http://static.dnaindia.com/sites/default/files/styles/full/public/2018/02/04/648069-rakul-preet-singh.jpg",
    "https://pbs.twimg.com/profile_images/928946397436506113/6QE6iLb7.jpg",
    "https://pbs.twimg.com/media/DUFbk2cV4AAwl2v.jpg",
    "https://qph.fs.quoracdn.net/main-qimg-980a13410f56739c66864b89c4466263-c",
    "http://starsvilla.com/wp-content/uploads/2017/09/19425346_145774522639533_5306252787913326592_n.jpg",
    "https://i1.wp.com/akmatter.com/wp-content/uploads/2018/01/Rakul-Preet-Singh.jpg",
    "https://data1.ibtimes.co.in/cache-img-600-450/en/full/571296/1494666323_anushka-shetty-baahubali.jpg"
  ];

  public filteredUsers: Array<any> = [];
  // public itemRef: firebase.database.Reference = firebase.database().ref('/users');

  filtersFromUser = new Filters();

  constructor(private sanitizer: DomSanitizer,  public userservice: UserProvider, public navParams: NavParams) {
    for (let i = 0; i < this.images.length; i++) {
      this.attendants.push({
        id: i + 1,
        likeEvent: new EventEmitter(),
        destroyEvent: new EventEmitter(),
        asBg: this.sanitizer.bypassSecurityTrustStyle('url('+this.images[i]+')')
      });
    }

    this.ready = true;
  }

  ionViewDidLoad() {
    this.userservice.getusersdetails("filters").then((res: any)=>{
      if (res) {
       this.filtersFromUser = res;
       console.log(this.filteredUsers);
      }
    });
    debugger;
    console.log("hi im in search friends the addicts type is = " + this.filtersFromUser.addictsType);
    this.userservice.getFilterUsers(this.filtersFromUser).then((res: any)=>{
      this.filteredUsers = res;
    })

  }

  onCardInteract(event) {
    console.log(event);
  }


}
