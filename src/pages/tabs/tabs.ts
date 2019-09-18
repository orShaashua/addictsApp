import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';



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
  constructor() {
    console.log('constructor TabsPage');
  }





}
