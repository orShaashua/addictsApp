import { Injectable } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {LoadingController} from "ionic-angular";
/*
  Generated class for the ImghandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ImghandlerProvider {
  nativepath: any;
  firestore = firebase.storage();

  constructor(public filechooser: FileChooser, private camera: Camera, public loadingCtrl: LoadingController) {
  }

  uploadimage() {
    let loader = this.loadingCtrl.create({
      content: 'אנא המתן'
    });
    return new Promise((resolve, reject) => {
      //this.filechooser.open().then((url) => {
        //(<any>window).FilePath.resolveNativePath(url, (result) => {
      const options: CameraOptions = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI,
        quality: 100,
        targetWidth: 1000,
        targetHeight: 1000,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true
      };
      this.camera.getPicture(options).then((imageData) => {
        loader.present();
        this.nativepath =  imageData;
         (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
           res.file((resFile) => {
             var reader = new FileReader();
             reader.readAsArrayBuffer(resFile);
             reader.onloadend = (evt: any) => {
               var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
               var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
               imageStore.put(imgBlob).then((res) => {
                 this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                   loader.dismiss();
                   resolve(url);
                 }).catch((err) => {
                   loader.dismissAll();
                   reject(err);
                 })
               }).catch((err) => {
                 loader.dismissAll();
                 reject(err);
               })
             }
           })
         })
      }).catch((err)=>{
        loader.dismissAll();
        reject(err);
      });
    });
}

  picmsgstore(){
      let loader = this.loadingCtrl.create({
        content: 'אנא המתן'
      });
      return new Promise((resolve, reject) => {
        //this.filechooser.open().then((url) => {
        //(<any>window).FilePath.resolveNativePath(url, (result) => {
        const options: CameraOptions = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI,
          quality: 100,
          targetWidth: 1000,
          targetHeight: 1000,
          encodingType: this.camera.EncodingType.JPEG,
          correctOrientation: true
        };
        this.camera.getPicture(options).then((imageData) => {
          loader.present();
            this.nativepath = imageData;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                  var uuid = this.guid();
                  var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid);
                  imageStore.put(imgBlob).then((res) => {
                    this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid).getDownloadURL().then((url) => {
                      loader.dismiss();
                      resolve(url);
                    }).catch((err) => {
                    loader.dismissAll();
                    reject(err);
                    })
                 .catch((err) => {
                   loader.dismissAll();
                   reject(err);
                 })
                })
                }
              })
            })
          })
        })
    }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
