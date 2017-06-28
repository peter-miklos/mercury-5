import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment }            from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  public token: string;

  constructor(
    @Inject(Http) private http: Http
  ) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
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

  loginOnBackEnd(input: any): Observable<boolean> {
    let headers = new Headers({'Content-type': 'application/json'});
    return this.http.post('http://localhost:3000/api/v1/session/new',
                          JSON.stringify({
                            fbToken: input.authResponse.accessToken,
                            expiresIn: input.authResponse.expiresIn,
                            status: input.status
                          }), {headers})
                    .map((res: Response) => {
                      let token = res.json() && res.json().token;
                      if(token) {
                        this.token = token;
                        localStorage.setItem('currentUser', JSON.stringify({username: res.json().user.email, token: token, expiration: res.json().expiration}));
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
