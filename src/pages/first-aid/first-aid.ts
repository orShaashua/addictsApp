import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {MatchPage} from "../match/match";
import firebase from "firebase";
import {HelpInformationPage} from "../help-information/help-information";

/**
 * Generated class for the FirstAidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first-aid',
  templateUrl: 'first-aid.html',
})
export class FirstAidPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstAidPage');
  }
  select(situation){

    let modal = this.modalCtrl.create(HelpInformationPage, {
      situation: situation
    });
    modal.present();
  }
}
