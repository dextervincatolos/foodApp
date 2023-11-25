import { Component } from '@angular/core';

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
}
