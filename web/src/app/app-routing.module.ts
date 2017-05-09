import { Routes, RouterModule }     from '@angular/router';

const appRoutes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  // { path: 'products/new', component: ProductFormComponent, canActivate: [AuthGuard] },
  // { path: 'products/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
]

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
