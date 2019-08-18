import { Component } from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import firebase from "firebase";
import {MatchPage} from "../match/match";
import {LikesProvider} from "../../providers/likes/likes";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:string = "ProfilePage";
  tab2:string = "ChatsPage";
  tab3:string = "MatchesPage";
  constructor(public modalCtrl: ModalController,
              public likesService: LikesProvider) {
  }





}
