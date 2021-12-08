import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(public auth: AngularFireAuth) { }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

  ngOnInit(): void {
  }

}
