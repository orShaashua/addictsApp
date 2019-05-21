import {Component, NgZone, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database'
import {ChatProvider} from "../../providers/chat/chat";
import {ImghandlerProvider} from "../../providers/imghandler/imghandler";
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
  allmessagestimestamp = [];
  buddy: any;
  photoURL;
  imageornot;
  constructor(public db: AngularFireDatabase,
              public navCtrl: NavController, public navParams: NavParams,public events: Events,
            public chatservice: ChatProvider,public zone: NgZone, public imgstore: ImghandlerProvider) {

    this.buddy = this.chatservice.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', ()=>{
      this.allmessages = [];
      this.imageornot =[];
      this.zone.run(()=>{
        this.allmessages = this.chatservice.buddymessages;
        for(var key in this.allmessages){
          var date = new Date(this.allmessages[key].timestamp);
          this.allmessagestimestamp.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " "
            + date.getHours() + ":" + date.getMinutes());
          if (this.allmessages[key].message.substring(0,4)=='http'){
            this.imageornot.push(true);
          }else{
            this.imageornot.push(false);
          }

        }
      })

      //this.scrollto();
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
  sendPicture(){
    this.imgstore.picmsgstore().then((imgurl)=>{
      this.chatservice.addnewmessage(imgurl).then(()=>{
        this.content.scrollToBottom();
        this.newmessage ='';
      }).catch((err)=>{
        alert(err);
      });
    }).catch((err)=>{
      alert(err);
    });
  }

}
