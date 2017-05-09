import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { AuthenticationService }  from '../_services/authentication.service';

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

  private handleLoginError(): void {
    this.error = 'Username or password is incorrect!';
    this.loading = false;
  }

}
