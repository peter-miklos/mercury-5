import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment }            from '../../environments/environment';

declare const FB: any;

@Injectable()
export class AuthenticationService {

  public token: string;

  constructor(
    @Inject(Http) private http: Http
  ) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

    FB.init({
      appId      : environment.fbAppId,
      cookie     : false,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.9' // use graph api version
    });
  }

  loginWithFb(): void {
    FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  }

  logoutWithFb(): void {
    FB.logout((response: any) => {
      console.log("User is logged out");
      this.logout();
    })
  }

  loginOld(username: string, password: string): Observable<boolean> {
    let headers = new Headers({'Content-type': 'application/json'});
    return this.http.post('http://localhost:3000/api/v1/session/new2',
                          JSON.stringify({username: username, password: password}),
                          {headers})
                    .map((res: Response) => {
                      let token = res.json() && res.json().token;
                      if(token) {
                        this.token = token;
                        localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
                        return true;
                      } else {
                        return false
                      }
                    })
                    .catch(this.handleError);
  }

  private loginOnBackEnd(input: any): Observable<boolean> {
    let headers = new Headers({'Content-type': 'application/json'});
    console.log("STEP 1");
    console.log(input.authResponse.accessToken);
    console.log(input.authResponse.expiresIn);
    console.log(input.status);
    return this.http.post('http://localhost:3000/api/v1/session/new',
                          JSON.stringify({
                            fbToken: input.authResponse.accessToken,
                            expiresIn: input.authResponse.expiresIn,
                            status: input.status
                          }), {headers})
                    .map((res: Response) => {
                      console.log("STEP 2");
                      let token = res.json() && res.json().token;
                      if(token) {
                        this.token = token;
                        localStorage.setItem('currentUser', JSON.stringify({username: res.json().email, token: token}));
                        return true;
                      } else {
                        return false
                      }
                    })
                    .catch(this.handleError);
  }

  private logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  private statusChangeCallback(response) {
    if (response.status === 'connected') {
      this.loginOnBackEnd(response)
        // connect here with your server for facebook login by passing access token given by facebook
    } else {
      this.fbLogin();
    }
  };

  private fbLogin(): void {
    FB.login((response: any) => {
      this.loginOnBackEnd(response);
      console.log("USER LOGGED IN");
      console.log(response);
    }, {scope: 'public_profile,email,user_friends'});
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error["_body"] || JSON.stringify(error);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
