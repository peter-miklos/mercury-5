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

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
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
    })
  }

  private statusChangeCallback(resp) {
    if (resp.status === 'connected') {
        // connect here with your server for facebook login by passing access token given by facebook
    }else if (resp.status === 'not_authorized'){
      console.log("Not logged in");
    } else {
      this.fbRealLogin();
    }
  };

  private fbRealLogin(): void {
    FB.login((response: any) => {
      console.log("USER LOGGED IN");
    }, {scope: 'public_profile,email,user_friends'});
  }

  private handleLoginError(): void {
    this.error = 'Username or password is incorrect!';
    this.loading = false;
  }

}
