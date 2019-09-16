import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {FilterPage} from "../pages/filter/filter";
import {SettingsPage} from "../pages/settings/settings";
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from "../pages/profile/profile";
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase'
import {TabsPage} from "../pages/tabs/tabs";
import {UserProvider} from "../providers/user/user";
import {FirstAidPage} from "../pages/first-aid/first-aid";
import {PhoneNumbersPage} from "../pages/phone-numbers/phone-numbers";
import {DistressButtonePage} from "../pages/distress-buttone/distress-buttone";
import {MeditationGuidePage} from "../pages/meditation-guide/meditation-guide";
// import { Geolocation } from '@ionic-native/geolocation'


  @Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make LoginIonicPage the root (or first) page
  // public rootPage: any = 'LoginPage';
  rootPage: any;
  authFlag: boolean = false;

  // public rootPage = LoginPage;
  pages: Array<{title: string, component: any}>;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public angularFireAuth: AngularFireAuth,
    public userservice: UserProvider
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'פרופיל', component: TabsPage },
      { title: 'מדריך עזרה ראשונה', component: FirstAidPage },
      { title: 'טלפונים רלוונטים', component: PhoneNumbersPage },
      { title: 'מדריך מדיטציה', component: MeditationGuidePage },
      { title: 'כפתור מצוקה', component: DistressButtonePage },
      { title: 'התנתק', component: LoginPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this means that you dont need to sign in every time
        firebase.auth().onAuthStateChanged((user) => {
          if(this.authFlag == false) {
            this.authFlag = true;
            if (user) {
              //update location every time the user goes into the app
              const res = this.userservice.updateLocation();
              this.nav.setRoot(TabsPage);
              this.rootPage = TabsPage;
            } else {
              this.nav.setRoot(LoginPage);
              this.rootPage = LoginPage;
            }
            console.log("I'm here! HomePage");
          }
        });

    });
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
