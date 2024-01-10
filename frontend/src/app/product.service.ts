

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( public httpClient:HttpClient){}

  saveProduct(product:any):Observable<any>{
    return this.httpClient.post('http://localhost:3000/snack-point/storeProduct', product)
  }

  loadProductInfo():Observable<Product[]>{
    return this.httpClient.get<Product[]>('http://localhost:3000/snack-point/findProduct');
  }

  loadProductByCategory(categoryId: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`http://localhost:3000/snack-point/findProductsByCategory?categoryId=${categoryId}`);
  }
  
}
