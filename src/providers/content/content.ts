import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from "firebase";

@Injectable()
export class ContentProvider {
  firedatacontent = firebase.database().ref('/Content');
  firestorecontent = firebase.storage().ref('/content');
  constructor() {
    console.log('Hello ContentProvider Provider');
  }
  getMeditationContext(){
    return new Promise(resolve => {
      this.firedatacontent.child("MeditationGuide").once('value', (snapshot)=>{
        resolve(snapshot.val());
      });
    });
  }
  getPhoneNumbersPic(){
    return new Promise(resolve => {
      this.firestorecontent.child("phone_numbers.png").getDownloadURL().then((url) => {
        resolve(url);
      });
    });
  }
  getFirstAidContext(situation){
    return new Promise(resolve => {
      this.firedatacontent.child("FirstAid").child(situation).once('value', (snapshot)=>{
        resolve(snapshot.val());
      });
    });
  }

}
