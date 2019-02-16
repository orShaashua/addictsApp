import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'login-ionic.html'
})
export class LoginIonicPage {

  @ViewChild('username') uname;
  @ViewChild('password') password;



  constructor() {

  }

  signIn(){
    // alert("hi! your name is: " + this.uname.value + "\nand your password is: " +  this.password.value);
    if((!this.uname.value) || (!this.uname.password)){
      alert("לא הזנת את כל הנתונים")
    }
  }
}
