import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthServiceService {

  constructor(
    private firebaseAuthentication: FirebaseAuthentication,
    private fireAuth: AngularFireAuth
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
}
