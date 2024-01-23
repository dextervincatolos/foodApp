
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductCategoryService } from '../product-category.service';
import { Product } from '../product-model';
import { ProductCategoryModel } from '../product-category-model';
import { BasketModel } from '../basket-model';
import { BasketService } from '../basket.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  productImg: string = 'assets/images/b2.jpg';

  getProduct:Array<Product> = [];
  getProductCategory:Array<ProductCategoryModel> = [];

  userBasketItems: any[] = [];

  getItemCount(): number {
    return this.userBasketItems.reduce((count, item) => {
      if (item._items && Array.isArray(item._items)) {
        return count + item._items.length;
      }
      return count;
    }, 0);
  }

  userId: string = '';

  constructor(public productService:ProductService, public productCategoryService:ProductCategoryService, public basketService:BasketService,private authService: AuthService){

    const userInfo = this.authService.getUserInfo();
    this.userId = userInfo ? userInfo.id : '';
  }

  
   

  addtoBasket(productId: string) {
 
     if (productId  && this.userId) { 
 
       this.basketService.addtoBasket(productId,this.userId).subscribe({
         next: (result: any) => {
           console.log('Product added to cart:', result);
           this.basketService.getUserBasketItems(this.userId).subscribe({
            next: (result: any) => {
              this.userBasketItems = result;
              this.basketService.updateCartItemCount(this.getItemCount() );
              console.log('items:', this.getItemCount());
            },
            error: (error: any) => {
              console.log('Error retrieving basket items:', error);
            }
          });
           
         },
         error: (error: any) => {
           console.log('Error adding product to cart:', error);
           // Handle error if needed
         }
       });
     } else {
       console.log('Product ID is empty or invalid.');
       // Handle empty or invalid product ID case if needed
     }
   }
  
loadproductDetails() {
  this.productService.loadProductInfo().subscribe({
    next: (result: any[]) => {
      const updatedProducts = result.map(product => {
        if (product._product_image) {
          try {
            const bufferData = product._product_image.data.data; // Extracting the buffer data
            const binary = String.fromCharCode(...bufferData); // Converting the buffer data to a binary string
          
            // Convert binary string to base64
            const base64String = btoa(binary);

            // Update _product_image field only if data exists and process it to base64
            return {
              ...product,
              _product_image: `data:${product._product_image.contentType};base64,${base64String}`
            };
          } catch (error) {
            console.log("Error processing product image:", error);
            // If an error occurs during processing, return the original product
            return product;
          }
        } else {
          // If _product_image data doesn't exist, return the original product
          return product;
        }
      });

      this.getProduct = updatedProducts; // Assign the processed products to the variable
    },
    error: (error: any) => {
      console.log(error);
    },
    complete: () => {
      console.log("Fetched all products...");
    }
  });
}

  

  loadproductCategories(){
    this.productCategoryService.fetchproductCategory().subscribe({
      next:(result:any) => {
        this.getProductCategory = result;
      },
      error:(error:any) => {
        console.log(error);
      },
      complete: () => {
        console.log("Fetched all products...")
      }
    });
  }

    // Method to load products by category
  loadProductsByCategory(categoryId: string): void {
    this.productService.loadProductByCategory(categoryId).subscribe({
      next: (result: any[]) => {
        const updatedProducts = result.map(product => {
          if (product._product_image) {
            try {
              const bufferData = product._product_image.data.data; // Extracting the buffer data
              const binary = String.fromCharCode(...bufferData); // Converting the buffer data to a binary string
            
              // Convert binary string to base64
              const base64String = btoa(binary);
  
              // Update _product_image field only if data exists and process it to base64
              return {
                ...product,
                _product_image: `data:${product._product_image.contentType};base64,${base64String}`
              };
            } catch (error) {
              console.log("Error processing product image:", error);
              // If an error occurs during processing, return the original product
              return product;
            }
          } else {
            // If _product_image data doesn't exist, return the original product
            return product;
          }
        });
  
        this.getProduct = updatedProducts; // Assign the processed products to the variable
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Fetched products by category...');
      }
    });
  }



  ngOnInit(){
    this.loadproductDetails();
    this.loadproductCategories();
 
  }
}

