import { Component, OnInit } from '@angular/core';
import { BasketModel } from '../basket-model';
import { BasketService } from '../basket.service';
import { AuthService } from '../auth.service';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  title = 'Snack Point| Dashboard';
  appLogo: string = 'assets/images/logo2.jpg';
  productImg: string = 'assets/images/b2.jpg';

  userId: string = '';
  userBasketItems: any[] = [];
  userName: string | undefined;
  itemCount: number = 0;

  constructor(public basketService:BasketService,private authService: AuthService,private logoutService: LogoutService){

    const userInfo = this.authService.getUserInfo();
    this.userId = userInfo ? userInfo.id : '';
  
  }

  getItemCount(): number {

    return this.userBasketItems.reduce((count, item) => {

      if (item._items && Array.isArray(item._items)) {

        return count + item._items.length;

      }

      return count;
    }, 0);
  }
  
  countItem(){

    this.basketService.getUserBasketItems(this.userId)

      .subscribe({

        next:(result) => {

          this.userBasketItems = result; 
          this.itemCount = this.getItemCount()

        },
        error:(error:any) => {

          console.log(error);

        },
        complete: () => {

          console.log("Fetched all products in your basket...")
          
        }
      });
    
  }
  ngOnInit(){
    this.countItem();
    this.basketService.itemCount$.subscribe(count => {
      this.itemCount = count;
    });

    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.userName = userInfo.fname + ' ' + userInfo.lname;
    }
 
  }

  logout(): void {
    this.logoutService.logout();
  }
}

