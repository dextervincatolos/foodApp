import { Component } from '@angular/core';

import { FormGroup, FormControl,Validators  } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  title = 'Snack Point| Login Page';
  appLogo: string = 'assets/images/logo2.jpg';

  constructor(public userService:UserService,private router: Router,private titleService: Title){}

  register= new FormGroup({
    _first_name: new FormControl('',Validators.required),
    _last_name: new FormControl('',Validators.required),
    _email: new FormControl('',Validators.required),
    _password: new FormControl('',Validators.required),
    _accesstype: new FormControl('user')
  })

  registrationFailed = false;

  registerUser(){

    if (this.register.valid) {

      let user = this.register.value;
      this.userService.registerUser(user).subscribe({
        next: (result:any) => {
          console.log(result);
          this.router.navigateByUrl('');
        },
        error: (error:any) => {
          console.log('Error during registration:', error);
        },
        complete: () => {

          console.log("New user registered successfully!")
          this.register.reset();
          // this.loadproductDetails();
         
        }
      })

    } else {
      this.registrationFailed = true;
    }

  }

  ngOnInit() {

    this.titleService.setTitle('Snack Point| Wishlist Page');
    
  }
  
}

