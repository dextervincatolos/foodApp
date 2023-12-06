import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product-model';
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

  constructor(public productService:ProductService){}

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


  ngOnInit(){
    this.loadproductDetails();
  }
}

