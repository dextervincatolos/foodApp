import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategoryModel } from './product-category-model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(public httpClient:HttpClient) { }

  fetchproductCategory():Observable<ProductCategoryModel[]>{
    return this.httpClient.get<ProductCategoryModel[]>('http://localhost:3000/snack-point/findProductCategory');
  }
}
