import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../firebase/firebase-auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private firebaseAuthService: FirebaseAuthService) {}

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

  isLogged(): boolean {
    this.isLoggedIn = this.firebaseAuthService.isLogged();
    return this.isLoggedIn;
  }

  onAuthStateChanged(): Observable<firebase.User> {
    return new Observable((observer) => {
      this.firebaseAuthService.fireAuth.auth.onAuthStateChanged(user => {
        if (user) {
          observer.next(user);
        } else {
          observer.error({message: 'User is not logged in or did logout'});
        }
      });
    });
  }

  setUser(user: firebase.User) {
    this.firebaseAuthService.currentUser = user;
  }
}
