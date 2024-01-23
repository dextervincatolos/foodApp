import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminguardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isAdminLoggedIn()) {

        return true;
      
    }else{
      if (localStorage.getItem('token') !== null) {
        this.router.navigate(['/dashboard']);
        return false;
      }
    }

    this.router.navigate(['']);
    return false;
  }
}
