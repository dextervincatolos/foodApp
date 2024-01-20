

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    let token = localStorage.getItem('token');

    if (token) {
      let headers = new HttpHeaders({
        'Authorization': `${token}`
      });
      return this.httpClient.get<Product[]>('http://localhost:3000/snack-point/findProduct', { headers });
    }else{
      throw new Error('Token not available');
    }


   
  }


  loadProductByCategory(categoryId: string): Observable<Product[]> {
    
    let token = localStorage.getItem('token');
  
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `${token}`
      });
  
      return this.httpClient.get<Product[]>(`http://localhost:3000/snack-point/findProductsByCategory?categoryId=${categoryId}`, { headers });
    } else {
      throw new Error('Token not available');
    }
  }
  
}