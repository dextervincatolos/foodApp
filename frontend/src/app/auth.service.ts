import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private userInfoKey = 'userInfo';

  setUserInfo(userInfo: any): void {
    localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));
  }

  getUserInfo(): any {
    const userInfoString = localStorage.getItem(this.userInfoKey);
    return userInfoString ? JSON.parse(userInfoString) : null;
  }

  clearUserInfo(): void {
    localStorage.removeItem(this.userInfoKey);
  }

  isUserLoggedIn(): boolean {
    // Implement logic to check if the user is logged in, e.g., check for a token
    //return localStorage.getItem('token') !== null;
    if (localStorage.getItem('token') !== null) {
      const userInfoString = localStorage.getItem('userInfo');

      if (userInfoString) {
        try {

          let userInfo = JSON.parse(userInfoString);

          return userInfo?.typeOfuser === 'user';

        } catch (error) {

          console.error('Error parsing userInfo:', error);
          
        }
      }
    }

  
    return false;

  }

  isAdminLoggedIn(): boolean {
    // Implement logic to check if the user is logged in, e.g., check for a token
    //return localStorage.getItem('token') !== null;
    // if (localStorage.getItem('token') !== null) {
      const userInfoString = localStorage.getItem('userInfo');

      if (userInfoString) {
        try {

          let userInfo = JSON.parse(userInfoString);

          return userInfo?.typeOfuser === 'admin';

        } catch (error) {

          console.error('Error parsing userInfo:', error);
          
        }
      }
    // }else{

    // }

  
    return false;

  }
}
