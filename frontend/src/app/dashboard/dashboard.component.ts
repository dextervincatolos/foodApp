
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductCategoryService } from '../product-category.service';
import { Product } from '../product-model';
import { ProductCategoryModel } from '../product-category-model';
import { BasketModel } from '../basket-model';
import { BasketService } from '../basket.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  productImg: string = 'assets/images/b2.jpg';

  getProduct:Array<Product> = [];
  getProductCategory:Array<ProductCategoryModel> = [];

  constructor(public productService:ProductService, public productCategoryService:ProductCategoryService, public basketService:BasketService){}

  loadproductDetails(){
    this.productService.loadProductInfo().subscribe({
      next:(result:any) => {
        this.getProduct = result;
      },
      error:(error:any) => {
        console.log(error);
      },
      complete: () => {
        console.log("Fetched all products...")
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

  addtoBasket(productId: string) {
    console.log('Product ID:', productId);

    if (productId) { // Ensure productId is not empty
      this.basketService.addtoBasket(productId).subscribe({
        next: (result: any) => {
          console.log('Product added to cart:', result);
          // Handle success if needed
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

  ngOnInit(){
    this.loadproductDetails();
    this.loadproductCategories();
  }
}

