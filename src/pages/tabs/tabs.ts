import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';


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
