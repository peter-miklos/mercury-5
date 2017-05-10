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

  logOutWithFb(): void {
    FB.logout((response: any) => {
      console.log("User is logged out");
    })
  }

  loginOld(username: string, password: string): Observable<boolean> {
    let headers = new Headers({'Content-type': 'application/json'});
    return this.http.post('http://localhost:4000/api/v1/session/new',
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


  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  private statusChangeCallback(resp) {
    if (resp.status === 'connected') {
        // connect here with your server for facebook login by passing access token given by facebook
    }else if (resp.status === 'not_authorized'){
      console.log("Not logged in");
    } else {
      this.fbLogin();
    }
  };

  private fbLogin(): void {
    FB.login((response: any) => {
      console.log("USER LOGGED IN");
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
