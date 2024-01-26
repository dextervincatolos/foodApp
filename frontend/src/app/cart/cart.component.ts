import { Component } from '@angular/core';
import { BasketService } from '../basket.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  productImg: string = 'assets/images/b2.jpg';
  ads: string='assets/images/pizza-commercial.gif';
  relatedP1: string='assets/images/b1.jpg';
  relatedP2: string='assets/images/p2.jpg';
  relatedP3: string='assets/images/d9.jpg';

  cartItems: any[] = []; // Array to store cart items

  userId: string = '';

  constructor(private basketService: BasketService,private authService: AuthService) {

    const userInfo = this.authService.getUserInfo();
    this.userId = userInfo ? userInfo.id : '';

  }
  loadCartItems() {
    this.basketService.getMyCart(this.userId).subscribe({
        next: (result: any) => {
            const productQuantities: { [productId: string]: number } = {};

            const updatedProducts = result.items.reduce((uniqueProducts:any, product: any) => {
                const productId = product._id;

                // Increment the count for the current product ID
                productQuantities[productId] = (productQuantities[productId] || 0) + 1;

                // Check if this product ID has already been added to uniqueProducts
                const existingProduct = uniqueProducts.find((uniqueProduct:any) => uniqueProduct._id === productId);

                if (!existingProduct) {
                    // If this is the first occurrence, add it to uniqueProducts with the correct quantity
                    uniqueProducts.push({
                        ...product,
                        _product_image: this.processImage(product._product_image),
                        quantity: 1  // Set quantity to 1 for the first occurrence
                    });
                } else {
                    // If the product already exists, update its quantity
                    existingProduct.quantity += 1;
                }

                return uniqueProducts;
            }, []);

            this.cartItems = updatedProducts;
        },
        error: (error: any) => {
            console.log('Error retrieving cart items:', error);
        }
    });
}


private processImage(imageData: any): string {
    if (imageData) {
        try {
            const bufferData = imageData.data.data;
            const binary = String.fromCharCode(...bufferData);
            const base64String = btoa(binary);

            return `data:${imageData.contentType};base64,${base64String}`;
        } catch (error) {
            console.log("Error processing product image:", error);
        }
    }

    return ''; // Return an empty string if there's no image data
}


  ngOnInit() {
    this.loadCartItems();
}

}
