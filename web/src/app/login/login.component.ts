import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { AuthenticationService }  from '../_services/authentication.service';
import { environment }            from '../../environments/environment';

declare const FB: any;

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
  ) {
    FB.init({
      appId      : environment.fbAppId,
      cookie     : false,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.9' // use graph api version
    });
  }

  ngOnInit() { }

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
    FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  }

  fbLogout(): void {
    FB.logout((response: any) => {
      console.log("User is logged out");
      this.authenticationService.logout();
    })
  }

  private statusChangeCallback(response): void {
    if (response.status === 'connected') {
      this.loginToBackEndWithFb(response)
    } else {
      FB.login((response: any) => {
        this.loginToBackEndWithFb(response);
      }, {scope: 'public_profile,email,user_friends'});
    }
  };

  private loginToBackEndWithFb(response: any): void {
    this.loading = true;
    this.authenticationService.loginOnBackEnd(response)
        .subscribe(
          result => {
            if (result) { this.router.navigate(['/']); }
            else { this.handleLoginError(); }
          },
          error => { this.handleLoginError(); }
        )
  }

  private handleLoginError(): void {
    this.error = 'Username or password is incorrect!';
    this.loading = false;
  }

}
