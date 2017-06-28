import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AuthenticationService }  from './authentication.service';
import { Product }                from '../_models/product.model';

@Injectable()
export class ProductService {

  private productUrl = "http://localhost:3000/api/v1";
  private headers = new Headers({
    'Authorization': `Bearer ${this.authenticationService.token}`,
    'Content-type': 'application/json'
  });

  constructor(
    @Inject(Http) private http: Http,
    @Inject(AuthenticationService) private authenticationService: AuthenticationService
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(`${this.productUrl}/products`, {headers: this.headers})
               .map((res: Response) => {
                 return res.json() as Product[];
               })
               .catch(this.handleError)
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
