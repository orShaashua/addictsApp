import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings';
import { FilterPage } from '../pages/filter/filter';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {RegisterPage} from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import {File} from '@ionic-native/file/ngx';
import {FilePath} from "@ionic-native/file-path/ngx";
import {FileChooser} from "@ionic-native/file-chooser/ngx";
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {Camera} from "@ionic-native/camera";
import { AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule}from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {ChatPage} from "../pages/chat/chat";
import {PasswordresetPage} from "../pages/passwordreset/passwordreset";
import {AngularFireAuth} from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import {TabsPage} from "../pages/tabs/tabs";
import {BuddiesPage} from "../pages/buddies/buddies";
import { ImghandlerProvider } from '../providers/imghandler/imghandler';

import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { SwipeCardsModule } from 'ng2-swipe-cards';
import {SearchFriendsPage} from "../pages/search-friends/search-friends";
import {MatchPage} from "../pages/match/match";
import {FiltersService} from "../services/FiltersService";

var config = {
  apiKey: "AIzaSyCHyiRzPEQKu03pF9bny8CZ-p6B1CdsJ5o",
  authDomain: "addictsapp.firebaseapp.com",
  databaseURL: "https://addictsapp.firebaseio.com",
  projectId: "addictsapp",
  storageBucket: "addictsapp.appspot.com",
  messagingSenderId: "618720101294"
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ItemDetailsPage,
    ListPage,
    SettingsPage,
    FilterPage,
    RegisterPage,
    ChatPage,
    PasswordresetPage,
    TabsPage,
    SearchFriendsPage,
    BuddiesPage,
    MatchPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    SwipeCardsModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ItemDetailsPage,
    ListPage,
    SettingsPage,
    FilterPage,
    RegisterPage,
    ChatPage,
    TabsPage,
    BuddiesPage,
    SearchFriendsPage,
    PasswordresetPage,
    MatchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AngularFireAuth,
    File,
    FilePath,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    RequestsProvider,
    ImghandlerProvider,
    ChatProvider,
    FiltersService,
  ]
})
export class AppModule {}
