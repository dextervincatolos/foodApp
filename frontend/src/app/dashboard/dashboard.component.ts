
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
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  productImg: string = 'assets/images/b2.jpg';

  userId: string = '';
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

  constructor(public productService:ProductService, public productCategoryService:ProductCategoryService, public basketService:BasketService,private authService: AuthService,private titleService: Title){

    const userInfo = this.authService.getUserInfo();
    this.userId = userInfo ? userInfo.id : '';
  }

  addtoBasket(productId: string) {
 
    if (productId  && this.userId) { 

      this.basketService.addtoBasket(productId,this.userId).subscribe({

        next: (result: any) => {
          
          this.basketService.getUserBasketItems(this.userId).subscribe({

            next: (result: any) => {
              this.userBasketItems = result;
              this.basketService.updateCartItemCount(this.getItemCount() );
              console.log('Product added to basket successfully!');
            },
            error: (error: any) => {
              console.log('Error retrieving basket items: ', error);
            }
          });
        },
        error: (error: any) => {

          console.log('Error adding product to cart: ', error);

        }
      });
    } else {

      console.log('Invalid!');

    }
  }
  
  loadproductDetails() {

    this.productService.loadProductInfo().subscribe({

      next: (result: any[]) => {

        const updatedProducts = result.map(product => {

          if (product._product_image) {

            try {

              const bufferData = product._product_image.data.data;
              const binary = String.fromCharCode(...bufferData);
              const base64String = btoa(binary);

              return {
                ...product,
                _product_image: `data:${product._product_image.contentType};base64,${base64String}`
              };

            } catch (error) {

              console.log("Error processing product image:", error);
              return product;
              
            }
          } else {
           
            return product;

          }
        });

        this.getProduct = updatedProducts; // Assign the processed products to the variable
      },
      error: (error: any) => {

        console.log(error);

      },
      complete: () => {

        console.log("Displaying all products.");

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

        
      }
    });
  }

  loadProductsByCategory(categoryId: string): void {

    this.productService.loadProductByCategory(categoryId).subscribe({

      next: (result: any[]) => {

        const updatedProducts = result.map(product => {

          if (product._product_image) {

            try {

              const bufferData = product._product_image.data.data;
              const binary = String.fromCharCode(...bufferData);
              const base64String = btoa(binary);
  
              return {
                ...product,
                _product_image: `data:${product._product_image.contentType};base64,${base64String}`
              };

            } catch (error) {

              console.log("Error processing product image:", error);
              return product;

            }
          } else {
            return product;
          }
        });
  
        this.getProduct = updatedProducts;
      },
      error: (error: any) => {

        console.log(error);

      },
      complete: () => {

        console.log('Displaying Products by category');

      }
    });
  }

  ngOnInit(){
    this.titleService.setTitle('Snack Point| Dashboard Page');
    this.loadproductDetails();
    this.loadproductCategories();
 
  }
}

