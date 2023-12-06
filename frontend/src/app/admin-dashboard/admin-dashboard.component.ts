import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product-model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  productEntry= new FormGroup({
    _product_name: new FormControl(),
    _category: new FormControl(),
    _description: new FormControl(),
    _rating: new FormControl(),
    _quantity: new FormControl(),
    _sold_item: new FormControl()
  })

  foodCategories: string[] = ['Pizza', 'Bread', 'Drink'];

  constructor(public productService:ProductService){}

  saveProduct(){
    let product = this.productEntry.value;
    this.productService.saveProduct(product).subscribe({
      next: (result:any) => {
        console.log(result);
      },
      error: (error:any) => {
        console.log(error);
      },
      complete: () => {
        console.log("New product registered successfully!")
        // this.loadproductDetails();
      }
    })
    this.productEntry.reset();
  }

  ngOnInit(){
    // this.refreshData();
  }
}
