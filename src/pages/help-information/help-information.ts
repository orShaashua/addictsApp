import {Component, NgZone} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ContentProvider} from "../../providers/content/content";

/**
 * Generated class for the HelpInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help-information',
  templateUrl: 'help-information.html',
})
export class HelpInformationPage {
  situation;
  text: string;
  video: SafeResourceUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private contentservice: ContentProvider, private domSanitizer: DomSanitizer) {
    this.situation = navParams.get('situation');
  }

  ionViewWillEnter() {
    // let loader = this.loadingCtrl.create({
    //   content: 'אנא המתן'
    // });
    // loader.present();
    this.contentservice.getFirstAidContext(this.situation).then((res: any)=>{
      this.text = res.text;
      if (res.video){
        let loader = this.loadingCtrl.create({
          content: 'אנא המתן'
        });
        loader.present();
        this.video = this.domSanitizer.bypassSecurityTrustResourceUrl(res.video);
        loader.dismiss();
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpInformationPage');
  }
  return(){
    this.navCtrl.pop();
  }

}
