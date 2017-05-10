import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { AuthenticationService }  from '../_services/authentication.service';
import { environment }            from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private model: any = {};
  private loading: boolean = false;
  private error: string = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // this.authenticationService.logout();
  }

  loginOld() {
    this.loading = true;
    this.authenticationService.loginOld(this.model.username, this.model.password)
        .subscribe(
          result => {
            if(result) {
              this.router.navigate(['/']);
            } else {
              this.handleLoginError();
            }
          },
          error => {
            this.handleLoginError();
          })
  }

  fbLogin(): void {
    this.authenticationService.loginWithFb();
  }

  fbLogout(): void {
    this.authenticationService.logoutWithFb();
  }

  private handleLoginError(): void {
    this.error = 'Username or password is incorrect!';
    this.loading = false;
  }

}
