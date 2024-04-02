import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  productImg: string = 'assets/images/b2.jpg';
  ads: string='assets/images/pizza-commercial.gif';
  relatedP1: string='assets/images/b1.jpg';
  relatedP2: string='assets/images/p2.jpg';
  relatedP3: string='assets/images/d9.jpg';

  constructor(private titleService: Title){}

  ngOnInit() {

    this.titleService.setTitle('Snack Point| Wishlist Page');
    
  }

}

