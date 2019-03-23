import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLogged()) { return true; }

    this.authService.onAuthStateChanged().subscribe(user => {
      if (user) {
        this.authService.setUser(user);
      }
      const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/tabs';
      this.router.navigateByUrl(redirect);
    },
    error => {
      // every time user is not logged in or do logout, he goes to /login
      this.authService.redirectUrl = url;
      this.router.navigate(['/login']);
    });

    return false;
  }
}
