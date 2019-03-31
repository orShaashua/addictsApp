import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {MatchesPage} from "../matches/matches";
import {BuddiesPage} from "../buddies/buddies";
import {RequestsProvider} from "../../providers/requests/requests";
import {ChatProvider} from "../../providers/chat/chat";
import {ChatPage} from "../chat/chat";

/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myrequests;
  myfriends;
  username: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public events:Events,
              public requestservice: RequestsProvider, public alertCtrl:AlertController, public chatservice: ChatProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }
  addbuddy(){
    this.navCtrl.push(BuddiesPage);
  }
  ionViewWillEnter  (){
    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.events.subscribe('gotrequests', ()=>{
      this.myrequests =[];
      this.myrequests = this.requestservice.userdetails;
    });
    this.events.subscribe('friends', ()=>{
      this.myfriends =[];
      this.myfriends = this.requestservice.myfriends;
    });
  }

  // ionViewDidLoad() {
  //   //
  //   // //   // this.db.list('/chat').push({
  //   // //   //   specialMessage: true,
  //   // //   //   message: `${this.username} has joined the room`
  //   // //   // });
  // }

  ionViewDidLeave (){
    // this._chatSubscription.unsubscribe();
    // this.db.list('/chat').push({
    //   specialMessage: true,
    //   message: `${this.username} has left the room`
    // });
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }

  accept(item){
    this.requestservice.acceptrequest(item).then(()=> {
      let alert = this.alertCtrl.create({
        title: 'Friend added',
        subTitle: 'Tab on the friend to chat with him',
        buttons: ['okay']
      });
      alert.present();
      this.ionViewWillEnter();
    })
  }
  ignore(item){
    this.requestservice.deleterequest(item).then(()=>{
      this.ionViewWillEnter();
    }).catch((err)=>{
     // alert(err);
      this.ionViewWillEnter();
    });
  }

  buddychat(buddy){
    this.chatservice.initializebudde(buddy);
    this.navCtrl.push(ChatPage);
  }
}
