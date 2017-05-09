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

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent
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
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
