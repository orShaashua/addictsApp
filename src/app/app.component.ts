import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {FilterPage} from "../pages/filter/filter";
import {SettingsPage} from "../pages/settings/settings";
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from "../pages/profile/profile";
import {AngularFireAuth} from 'angularfire2/auth';
// import {Config} from "ionic-angular/umd";
import firebase from 'firebase'
import {TabsPage} from "../pages/tabs/tabs";


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
    // public authService: AuthenticationService
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Login', component: LoginPage },
     // { title: 'My First List', component: ListPage }
      { title: 'Filter', component: FilterPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Profile Page', component: ProfilePage }
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
              this.nav.setRoot(TabsPage);
              this.rootPage = TabsPage;
            } else {
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
