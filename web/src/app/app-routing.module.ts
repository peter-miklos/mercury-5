import { Routes, RouterModule }     from '@angular/router';

import { ProductsComponent }        from './products/products.component';
import { LoginComponent }           from './login/login.component';
import { AuthGuard }                from './_guards/auth.guard';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  // { path: 'products/new', component: ProductFormComponent, canActivate: [AuthGuard] },
  // { path: 'products/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
]

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
