import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  reflactCartCount$ = new BehaviorSubject(0);

  constructor() { 
    const getStorage = localStorage.getItem('cart');
    const cartList = !getStorage ? [] : JSON.parse(getStorage);
    this.reflactCartCount$.next(cartList.length);
  }
}
