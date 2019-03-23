import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private _currentUser: firebase.User;

  // to get currentUser always updated.
  get currentUser(): firebase.User {
    return this.fireAuth.auth.currentUser ? this.fireAuth.auth.currentUser : this._currentUser;
  }
  set currentUser(user: firebase.User) {
    this._currentUser = user;
  }

  constructor(
    private firebaseAuthentication: FirebaseAuthentication,
    public fireAuth: AngularFireAuth
    ) { }

  async loginWithPhoneNumber(fullyPhoneNumber: string): Promise<any> {
    const code = '123456'; // just for test case...
    const verificationId = await this.firebaseAuthentication.verifyPhoneNumber(fullyPhoneNumber, 30000);
    // make fireangular2 login
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    await this.fireAuth.auth.signInWithCredential(<firebase.auth.AuthCredential> credential);
    // make cordova-plugin login
    return this.firebaseAuthentication.signInWithVerificationId(verificationId, code);
  }

  isLogged(): boolean {
    return this.currentUser != null;
  }

}
