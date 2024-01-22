import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {

      // const userType = this.authService.getUserInfo().typeOfuser;

      // if (userType === 'admin') {
        return true;
      // }

      // this.router.navigate(['/dashboard']);
      // return false;
      
    }

    this.router.navigate(['']);
    return false;
  }
}
