import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { FirebaseAuthServiceService } from '../firebase/firebase-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private firebaseAuthService: FirebaseAuthServiceService) {}

  async login(user: string) {
    const loggedTokenWithPhone = await this.firebaseAuthService
      .loginWithPhoneNumber(user)
      .catch(err => console.error(err));

    if (!loggedTokenWithPhone) {
      return false;
    }

    this.isLoggedIn = true;
    return this.isLoggedIn;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isLogged() {
    return this.isLoggedIn;
  }
}
