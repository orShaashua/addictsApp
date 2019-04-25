import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
/*
  Generated class for the ImghandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ImghandlerProvider {
  nativepath: any;
  firestore = firebase.storage();

  constructor(public filechooser: FileChooser, private camera: Camera) {
  }

  uploadimage() {
    var promise = new Promise((resolve, reject) => {
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
         this.nativepath =  imageData;
        // alert(imageData);
        // var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
        // alert(imageStore);
        // imageStore.putString(this.nativepath, 'base64', { contentType: 'image/jpg' }).then(function (snapshot) {
        // //   this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
        // //     alert(url);
        // //     resolve(url);
        // //   }).catch((err) => {
        // //     reject(err);
        // //     alert(err +" error");
        // //   })
        // }).catch((err) => {
        //   reject(err);
        //   alert(err +" error");
        // });
         (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
           res.file((resFile) => {
             var reader = new FileReader();
             reader.readAsArrayBuffer(resFile);
             reader.onloadend = (evt: any) => {
               var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
               var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
               imageStore.put(imgBlob).then((res) => {
                 this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                   resolve(url);
                 }).catch((err) => {
                   reject(err);
                 })
               }).catch((err) => {
                 reject(err);
               })
             }
           })
         })
      }).catch((err)=>{
        reject(err);
      });
    });
  //})
  return promise;
}

  picmsgstore(){
    return new Promise((resolve, reject) => {
      this.filechooser.open().then((url) => {
        (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) => {
                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg');
                imageStore.put(imgBlob).then((res) => {
                  this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg').getDownloadURL().then((url) => {
                    resolve(url);
                  }).catch((err) => {
                    reject(err);
                  })
                }).catch((err) => {
                  reject(err);
                })
              }
            })
          })
        })
      })
    });
  }
}
