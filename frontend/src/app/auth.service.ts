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

  isLoggedIn(): boolean {
    // Implement logic to check if the user is logged in, e.g., check for a token
    return localStorage.getItem('token') !== null;
  }
}
