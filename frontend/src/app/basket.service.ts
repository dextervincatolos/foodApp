
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasketModel } from './basket-model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(public httpClient :HttpClient) { }

  
  addtoBasket(productId:any):Observable<any>{
    const newitem = { _items: [productId] };
    return this.httpClient.post('http://localhost:3000/snack-point/addtoBasket', newitem)
  }

}


