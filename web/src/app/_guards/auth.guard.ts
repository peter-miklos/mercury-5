import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  public canActivate(): boolean {
    if(localStorage.getItem('currentUser') && this.isTokenValid()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private isTokenValid(): boolean {
    let actualTime = Math.floor(new Date().getTime() / 1000);
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.expiration > actualTime) {
      return true;
    } else {
      return false;
    }
  }
}
