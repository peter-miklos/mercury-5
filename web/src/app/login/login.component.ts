import { Component, OnInit, DoCheck } from '@angular/core';
import { Router }            from '@angular/router';

import { AuthenticationService }  from '../_services/authentication.service';
import { environment }            from '../../environments/environment';

declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {

  private model: any = {};
  private loading: boolean = false;
  private errorMsg: string = '';
  private userLoggedIn: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    FB.init({
      appId      : environment.fbAppId,
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.9' // use graph api version
    });
  }

  ngOnInit() {
    this.updateLoggedInUser();
  }

  ngDoCheck() {
    this.updateLoggedInUser();
  }

  public loginOld(): void {
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

  public fbLogin(): void {
    FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  }

  public fbLogout(): void {
    FB.getLoginStatus(response => {
      console.log(response);
      if (response.status === 'connected') {
        FB.logout((res: any) => {
          console.log("User is logged out");
          this.authenticationService.logout();
        })
      }
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
            else { this.handleLoginError();}
          },
          error => { this.handleLoginError(); }
        )
  }

  private handleLoginError(): void {
    this.errorMsg = 'Username or password is incorrect!';
    this.loading = false;
  }

  private updateLoggedInUser(): void {
    this.userLoggedIn = !!localStorage.getItem('currentUser');
  }

}
