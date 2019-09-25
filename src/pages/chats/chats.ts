import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {RequestsProvider} from "../../providers/requests/requests";
import {ChatProvider} from "../../providers/chat/chat";
import {ChatPage} from "../chat/chat";


@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myrequests =[];
  myfriends = [];
  public loader;
  username: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public events:Events,
              public requestservice: RequestsProvider, public loadingCtrl: LoadingController,
              public alertCtrl:AlertController, public chatservice: ChatProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }

  ionViewWillEnter  (){
    this.loader = this.loadingCtrl.create({
      content: 'אנא המתן'
    });
    this.loader.present();
    this.requestservice.getmyrequests().then((res:any)=>{
      this.myrequests = res;
      this.requestservice.getmyfriends().then((res:any)=>{
        this.myfriends = res;
        this.loader.dismiss();
      });
    });

    // this.events.subscribe('gotrequests', ()=>{
    //   this.myrequests =[];
    //   this.myrequests = this.requestservice.userdetails;
    // });
    // this.events.subscribe('friends', ()=>{
    //   this.myfriends =[];
    //   this.myfriends = this.requestservice.myfriends;
    // });
  }

  ionViewDidLeave (){
    // this.events.unsubscribe('gotrequests');
    // this.events.unsubscribe('friends');
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
    let loader = this.loadingCtrl.create({
      content: 'אנא המתן'
    });
    loader.present();
    this.requestservice.deleterequest(item).then(()=>{
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      loader.dismiss();
    }).catch((err)=>{
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      loader.dismiss();
    });
  }

  buddychat(buddy){
    this.chatservice.initializebudde(buddy);
    this.navCtrl.push(ChatPage);
  }
}
