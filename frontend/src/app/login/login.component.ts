import { Component } from '@angular/core';

import { FormGroup, FormControl,Validators  } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = 'Snack Point| Login Page';
  appLogo: string = 'assets/images/logo2.jpg';

  constructor(public userService:UserService,private router: Router, public authService:AuthService){}


  login = new FormGroup({
    _email: new FormControl('',Validators.required),
    _password: new FormControl('',Validators.required)
  })

  loginFailed = false;
  loginErrorMessage: string | null = null;

  loginUser(){

    if (this.login.valid) {

      let userCred = this.login.value;
      this.userService.loginUser(userCred).subscribe({
        next: (result:any) => {

          let accesType = result.payload.typeOfuser;

          localStorage.setItem('token',result.token);
          this.authService.setUserInfo(result.payload);
          
          if (accesType === 'admin') {

            this.router.navigateByUrl('new_product');
            
          }else{
            this.router.navigateByUrl('dashboard');
          }

        },
        error: (error:any) => {
          console.log('Login Error:', error);

          this.loginFailed = true;

          if (error.status === 401) {
            this.loginErrorMessage = 'An unexpected error occurred. Please try again.';
          } else {
            this.loginErrorMessage = 'Invalid email or password.';
          }

        },
        complete: () => {

          console.log("Login successfully!")
          this.login.reset();
         
        }
      })

    } else {
      this.loginFailed = true;
      this.loginErrorMessage = 'All fields required.';
    }

  }

}
