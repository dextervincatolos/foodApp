import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../product.service';
import { ProductCategoryService } from '../product-category.service';
import { ProductCategoryModel } from '../product-category-model';
import { LogoutService } from '../logout.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  foodCategories:Array<ProductCategoryModel> = [];

  productEntry= new FormGroup({
    _product_image: new FormControl(),
    _product_name: new FormControl(),
    _category: new FormControl(),
    _description: new FormControl(),
    _price: new FormControl(),
    _rating: new FormControl(),
    _quantity: new FormControl(),
    _sold_item: new FormControl()
  })

  constructor(public productService:ProductService,  public productCategoryService:ProductCategoryService,private logoutService: LogoutService,private titleService: Title){}
//----------------------------------------------------------------------------------------------------------
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result as string;
            this.productEntry.patchValue({
                _product_image: base64Image 
            });
        };
        reader.readAsDataURL(file);
    }
}
//----------------------------------------------------------------------------------------------------------
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
      }
    })
    this.productEntry.reset();

    const fileInput = <HTMLInputElement>document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = ''; 
    }
  }

  
  loadproductCategories(){
    this.productCategoryService.fetchproductCategory().subscribe({
      next:(result:any) => {
        this.foodCategories = result;
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
    
    this.loadproductCategories();
    this.titleService.setTitle('Snack Point| Admin Dashboard');
  }

  logout(): void {
    this.logoutService.logout();
  }
}
