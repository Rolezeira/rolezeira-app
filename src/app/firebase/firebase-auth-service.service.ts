import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthServiceService {

  constructor(private firebaseAuthentication: FirebaseAuthentication) {}

  loginWithPhoneNumber(fullyPhoneNumber: string): Promise<any> {
    return this.firebaseAuthentication.verifyPhoneNumber(fullyPhoneNumber, 30000);
  }

}
