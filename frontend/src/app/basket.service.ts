
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { BasketModel } from './basket-model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private itemCountSubject = new Subject<number>();

  itemCount$ = this.itemCountSubject.asObservable();

  constructor(public httpClient :HttpClient) { }

  
  addtoBasket(productId:any,userId:string):Observable<any>{
    const newitem = { _items: [productId], _user: userId };
    return this.httpClient.post('http://localhost:3000/snack-point/addtoBasket', newitem)
  }

  getUserBasketItems(userId: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/snack-point/findMybasket/?uid=${userId}`);
  }

  updateCartItemCount(count: number) {
    this.itemCountSubject.next(count);
  }
}
