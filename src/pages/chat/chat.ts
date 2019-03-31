import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database'
import {ChatProvider} from "../../providers/chat/chat";
import firebase from 'firebase';


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild('content') content: Content;
  newmessage: string = '';
  allmessages = [];
  buddy: any;
  photoURL;
  constructor(public db: AngularFireDatabase,
              public navCtrl: NavController, public navParams: NavParams,public events: Events,
            public chatservice: ChatProvider) {

    this.buddy = this.chatservice.buddy;

    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', ()=>{
      this.allmessages = [];
      this.allmessages = this.chatservice.buddymessages;
      this.scrollto();
    });
  }

  addmessage(){
    this.chatservice.addnewmessage(this.newmessage).then(()=>{
      this.content.scrollToBottom();
      this.newmessage = '';
    });
  }
  ionViewDidEnter(){
    this.chatservice.getbuddymessages();
  }
  ionViewDidLeave(){
    this.events.unsubscribe('newmessage');
  }
  scrollto(){
    setTimeout(()=>{
      this.content.scrollToBottom();
    },1000);
  }
}
