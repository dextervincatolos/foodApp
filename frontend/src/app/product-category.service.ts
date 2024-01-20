import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategoryModel } from './product-category-model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(public httpClient:HttpClient) { }

  fetchproductCategory():Observable<ProductCategoryModel[]>{

    let token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `${token}`
      });
  
      return this.httpClient.get<ProductCategoryModel[]>('http://localhost:3000/snack-point/findProductCategory', { headers });
    } else {
      throw new Error('Token not available');
    }

  }

}
