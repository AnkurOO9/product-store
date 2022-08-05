import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Product } from 'src/models/product';
import { addProductToCart, getAllProduct } from '../store/product.action';
import { selectCartItem, selectProduct } from '../store/product.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productList: Product[] = [];
  cartList: Product[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.store.pipe(select(selectProduct)).subscribe((products: Product[]) => {
      this.productList = JSON.parse(JSON.stringify(products));
    });
    this.store.dispatch(getAllProduct());

    this.store.pipe(select(selectCartItem)).subscribe((cartItems: Product[]) => {
      this.cartList = JSON.parse(JSON.stringify(cartItems));
    });
  }

  addProductToCart(item: Product) {
    item.isProgressBar = true;
    const obj = { ...item };
    const findIndex = this.cartList.findIndex(x => x.id === item.id);
    if (findIndex >= 0) {
      this.cartList[findIndex].cartDuplicateCount++;
    }
    else {
      obj.cartDuplicateCount = 1;
      this.cartList.push(obj);
    }

    this.store.dispatch(addProductToCart({ cartItem: this.cartList }));
    this.snackBar.open('Product added to cart', '', { duration: 1000 });
    setTimeout(() => {
      item.isProgressBar = false;
    }, 500);
  }

}
