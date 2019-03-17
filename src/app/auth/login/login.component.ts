import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  ngOnInit() {}

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  async login(user: string) {
    this.message = 'Trying to log in ...';

    const isLoggedIn = await this.authService.login(user);
    if (!isLoggedIn) {
      this.message = 'You can\'t go inside with this phone number, sorry 😐';
    } else {
      this.setMessage();
      const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/tabs';
      this.router.navigateByUrl(redirect);
    }
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
