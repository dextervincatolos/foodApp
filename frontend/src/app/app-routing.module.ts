import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthGuardLoggedoutService } from './auth-guard-loggedout.service';

const routes: Routes = [
  {path:'new_product', component: AdminDashboardComponent,canActivate: [AuthGuardService]},
  {path:'', component: LoginComponent, canActivate: [AuthGuardLoggedoutService] },
  {path:'signup', component: SignupComponent, canActivate: [AuthGuardLoggedoutService] },
  {path:'dashboard', component: DashboardComponent,canActivate: [AuthGuardService]},
  {path:'my_cart', component: CartComponent,canActivate: [AuthGuardService]},
  {path:'my_wishlist', component: WishlistComponent,canActivate: [AuthGuardService]},
  {path:'**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
