// import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// import firebase from "firebase";

// import firebase from "firebase";

const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


// exports.sendMatchNotification = functions.https.onCall((data:any, context:any) => {
//   admin.database().ref('/likes').child(context.auth.uid).orderByChild
//   ('sender').equalTo(data.userUID).on('child_added', function (snapshot:any) {
//     var myNewMatch = snapshot.val();
//     if (myNewMatch) {
//       const payload = {
//         notification: {
//           title:"MATCH",
//           body: "יש לך התאמה חדשה",
//           click_action:"FCM_PLUGIN_ACTIVITY",
//           // icon: "fcm_push_icon",
//           // sound:"default"
//         },
//         data:{
//           //Any data to be retrieved in the notification callback
//           title:"MATCH",
//           body: "יש לך התאמה חדשה",
//         },
//       };
//       // Send a message to devices subscribed to the provided topic.
//       admin.messaging().sendToDevice(data.mytoken, payload)
//         .then((response: any) => {
//           // Response is a message ID string.
//           console.log('Successfully sent message:', response);
//         })
//         .catch((error: any) => {
//           console.log('Error sending message:', error);
//         });
//     } else {
//       return;
//     }
//   });
// });

exports.sendHelpMessage = functions.https.onCall((data:any, context:any) => {
  console.log("start");
  // Message text passed from the client.
  var pos = data.text;
  // var user = context.auth.displayName;
  var uid  =  context.auth.uid;
  var name: string;
  console.log('text', pos);
  admin.database().ref('/users').orderByChild('uid').once('value', (snapshot:any) => {
    let userdata = snapshot.val();
    let tokens = [];
    for (var key in userdata) {
      if(userdata[key].uid != uid) {
        if (userdata[key].fcmToken) {
          tokens.push(userdata[key].fcmToken);
        }
      }else{
        name = userdata[key].displayName;
      }
    }
    console.log('uid', uid);
    console.log('name', name);
    console.log('fcm', tokens);
      const payload = {
        notification: {
          title: name  + ' נמצא/ת במצוקה' ,
          body: pos,
          click_action:"FCM_PLUGIN_ACTIVITY",
          // icon: "fcm_push_icon",
          // sound:"default"
        },
        data:{
          //Any data to be retrieved in the notification callback
          title: name  + ' נמצא/ת במצוקה' ,
          body: pos,
        },
      };
      // Send a message to devices subscribed to the provided topic.
      admin.messaging().sendToDevice(tokens, payload)
        .then((response: any) => {
          // Response is a message ID string.
          console.log('Successfully sent message:', response);
        })
        .catch((error: any) => {
          console.log('Error sending message:', error);
        });
    });
});
