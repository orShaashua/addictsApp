import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings';
import { FilterPage } from '../pages/filter/filter';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {RegisterPage} from '../pages/register/register';
import { AgmCoreModule } from '@agm/core';
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
import { ImghandlerProvider } from '../providers/imghandler/imghandler';

import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { SwipeCardsModule } from 'ng2-swipe-cards';
import {SearchFriendsPage} from "../pages/search-friends/search-friends";
import {MatchPage} from "../pages/match/match";
import {FiltersService} from "../services/FiltersService";
import { LikesProvider } from '../providers/likes/likes';
import {ChooseAvatarPage} from "../pages/choose-avatar/choose-avatar";
import {FirstAidPage} from "../pages/first-aid/first-aid";
import {PhoneNumbersPage} from "../pages/phone-numbers/phone-numbers";
import {MeditationGuidePage} from "../pages/meditation-guide/meditation-guide";
import {DistressButtonePage} from "../pages/distress-buttone/distress-buttone";
import { ContentProvider } from '../providers/content/content';
import {HelpInformationPage} from "../pages/help-information/help-information";

import { FCM } from '@ionic-native/fcm';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

// import { AndroidPermissions } from '@ionic-native/android-permission/ngx';
import {AndroidPermissions} from "@ionic-native/android-permissions";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { GpsProvider } from '../providers/gps/gps';

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

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
    MatchPage,
    HelpInformationPage,
    ChooseAvatarPage,
    FirstAidPage,
    PhoneNumbersPage,
    MeditationGuidePage,
    DistressButtonePage,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD7w7FtqB0QBI3nL75pZsuZqTYVl-Dd4ek"
    }),
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
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
    SearchFriendsPage,
    PasswordresetPage,
    MatchPage,
    HelpInformationPage,
    ChooseAvatarPage,
    FirstAidPage,
    PhoneNumbersPage,
    MeditationGuidePage,
    DistressButtonePage
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
    FCM,
    RequestsProvider,
    ImghandlerProvider,
    ChatProvider,
    FiltersService,
    LikesProvider,
    ContentProvider,

    Geolocation,
    LocationAccuracy,
    // AndroidPermissions,
    GpsProvider,
  ]
})
export class AppModule {}
