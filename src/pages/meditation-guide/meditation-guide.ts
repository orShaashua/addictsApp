import {Component, SecurityContext} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ContentProvider} from "../../providers/content/content";

/**
 * Generated class for the MeditationGuidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meditation-guide',
  templateUrl: 'meditation-guide.html',
})
export class MeditationGuidePage {
  url:SafeResourceUrl;
  trustedVideoUrl = [];
  // meditionVidoes = [{vid_link:"https://www.youtube.com/embed/hQlsY1KDrXI"},{vid_link:"https://www.youtube.com/embed/EWjtEUV6r-w"}];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private domSanitizer: DomSanitizer, private contentservice: ContentProvider) {

  }

  ionViewWillEnter() {
    this.contentservice.getMeditationContext().then((meditionVidoes:any)=>{
      for(let i of meditionVidoes){
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(i);
        this.trustedVideoUrl.push(this.url);
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MeditationGuidePage');
  }

}
