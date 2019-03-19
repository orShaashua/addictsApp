import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { LoginIonicPage } from '../pages/login/login-ionic';
import { SettingsPage } from '../pages/settings/settings';
import { FilterPage } from '../pages/filter/filter';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {RegisterPage} from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {Camera} from "@ionic-native/camera";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {ChatPage} from "../pages/chat/chat";
import {PasswordresetPage} from "../pages/passwordreset/passwordreset";
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireAuth} from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import {TabsPage} from "../pages/tabs/tabs";
import {BuddiesPage} from "../pages/buddies/buddies";
import { RequestsProvider } from '../providers/requests/requests';
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
    ChatPage,
    TabsPage,
    BuddiesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
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
    ChatPage,
    PasswordresetPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    RequestsProvider
  ]
})
export class AppModule {}
