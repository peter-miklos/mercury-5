import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <nav>
    <a routerLink="/">Home</a> |
    <a routerLink="/products">All products</a> |
    <a routerLink="/products/new">Add new product</a>
  </nav>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {}
