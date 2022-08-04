import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`https://fakestoreapi.com/products`);
  }

  getCartList(): Observable<Product[]> {
    return new Observable((res) => {
      const getStorage = localStorage.getItem('cart');
      if (!getStorage) {
        localStorage.setItem('cart', JSON.stringify([]));
        res.next([]);
      } else {
        res.next(JSON.parse(getStorage));
      }
    });
  }
}
