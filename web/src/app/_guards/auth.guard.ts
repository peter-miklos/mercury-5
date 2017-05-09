import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate() {
    if(localStorage.getItem('currentUser')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
