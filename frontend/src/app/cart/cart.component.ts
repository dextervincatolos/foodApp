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

  userId: string = '';
  cartItems: any[] = [];
  userBasketItems: any[] = [];
  
  isCartEmpty : boolean = false;


  isCheckoutEnabled: boolean = false;
  selectedItems: Set<string> = new Set<string>();

  getItemCount(): number {
    return this.userBasketItems.reduce((count, item) => {
      if (item._items && Array.isArray(item._items)) {
        return count + item._items.length;
      }
      return count;
    }, 0);
  }
  
  constructor(private basketService: BasketService,private authService: AuthService) {

    const userInfo = this.authService.getUserInfo();
    this.userId = userInfo ? userInfo.id : '';

  }


  loadCartItems() {
    this.basketService.getMyCart(this.userId).subscribe({

      next: (result: any) => {

        if (result && result.items && result.items.length > 0) {

          const productQuantities: { [productId: string]: number } = {};

          const updatedProducts = result.items.reduce((uniqueProducts:any, product: any) => {

            const productId = product._id;
            productQuantities[productId] = (productQuantities[productId] || 0) + 1;
            const existingProduct = uniqueProducts.find((uniqueProduct:any) => uniqueProduct._id === productId);

            if (!existingProduct) {
                  
              uniqueProducts.push({
                ...product,
                _product_image: this.processImage(product._product_image),
                quantity: 1 
              });
            } else {

              existingProduct.quantity += 1;

            }
              return uniqueProducts;

          }, []);

          this.cartItems = updatedProducts;
        } else {
          
          this.isCartEmpty = true;
          
        }
      },
      error: (error: any) => {

        if (error && error.status === 404) {

          this.isCartEmpty = true;

        } else {
          console.log('Unexpected error occurred.');
        }  
      }
    });
  }

  deleteItem(index: number): void {

    const productId = this.cartItems[index]._id;
  
    this.basketService.deleteItemFromCart(productId, this.userId).subscribe({

        next: (result: any) => {
  
          this.basketService.getUserBasketItems(this.userId).subscribe({

            next: (result: any) => {

              this.userBasketItems = result;
              this.basketService.updateCartItemCount(this.getItemCount() );

            },

            error: (error: any) => {
              console.log('Error retrieving basket items:', error);
            }
          });
            console.log('Item deleted from basket successfully!');
            this.loadCartItems();

        },
        error: (error: any) => {
          
            console.log('Error deleting item:', error);
        }
    });
  }

removeItem(productId: string) {

  this.basketService.removeItem(productId,this.userId).subscribe({

    next: (result: any) => {

      this.basketService.getUserBasketItems(this.userId).subscribe({

        next: (result: any) => {

          this.userBasketItems = result;
          this.basketService.updateCartItemCount(this.getItemCount() );

        },
        error: (error: any) => {

          console.log('Error retrieving basket items:', error);

        }
      });

      console.log('Item removed successfully!');
      this.loadCartItems();

    },
    error: (error: any) => {

      console.log('Error removing item:', error);

    }
  });
}

addItem(productId: string) {
 
  if (productId  && this.userId) { 

    this.basketService.addtoBasket(productId,this.userId).subscribe({

      next: (result: any) => {

        this.basketService.getUserBasketItems(this.userId).subscribe({

         next: (result: any) => {

           this.userBasketItems = result;
           this.basketService.updateCartItemCount(this.getItemCount() );

         },
         error: (error: any) => {
           console.log('Error retrieving basket items:', error);
         }
       });

       console.log('An Item is successfully added to basket!');
       this.loadCartItems();
        
      },
      error: (error: any) => {
        console.log('Error adding Item to cart:', error);
      }
    });
  } else {

    console.log('Invalid.');

  }
}

toggleCheckoutStatus(item: any): void {

  const itemId = item._id;

  if (this.selectedItems.has(itemId)) {

    this.selectedItems.delete(itemId);

  } else {

    this.selectedItems.add(itemId);

  }

  this.updateCheckoutStatus();
  this.calculateTotalAmount();
}

  updateCheckoutStatus(): void {

  this.isCheckoutEnabled = this.selectedItems.size > 0;

  }

  getCheckoutIconClass(item: any): string {

  return this.selectedItems.has(item._id) ? 'bi bi-circle-fill text-success' : 'bi bi-circle text-dark';

  }

calculateTotalAmount(): number {

  let total = 0;

  for (const item of this.cartItems) {

    if (this.selectedItems.has(item._id)) {

      total += item._price * item.quantity;

    }
  }
  return total;
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

    return '';
}

  ngOnInit() {
    
    this.loadCartItems();
    
}

}
