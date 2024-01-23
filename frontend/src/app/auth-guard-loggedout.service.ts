import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedoutService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate():boolean {

    const payload = this.authService.getUserInfo();

    if (payload !== null) {
      if (!this.authService.isUserLoggedIn() && this.authService.getUserInfo().typeOfuser === 'user'){
        return true;
      }
  
      if (!this.authService.isAdminLoggedIn() && this.authService.getUserInfo().typeOfuser === 'admin'){
        return true;
      }
      
    }else{
      return true;
    }

    const userType = this.authService.getUserInfo().typeOfuser;
    if (userType === 'admin') {
      this.router.navigate(['/new_product']);
    } else {
      this.router.navigate(['/dashboard']);
    }

    
    return false;
  }
}
