import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    // Clear user-related information from localStorage
    localStorage.removeItem('token');
    // Clear user-related information from the AuthService
    this.authService.clearUserInfo();

    this.router.navigate(['']);
    
    // Optionally, perform a logout operation on the server
    // This may involve sending a request to the server to invalidate the session

    // After performing the necessary actions, navigate to the login page or any other desired page
    // Example: this.router.navigateByUrl('/login');
  }
}
