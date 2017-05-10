import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders }   from './app-routing.module';
import { ProductsComponent } from './products/products.component';
import { AuthGuard }         from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { ProductService }        from './_services/product.service';
import { UserService }           from './_services/user.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    AuthenticationService,
    ProductService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
