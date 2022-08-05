import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Product } from 'src/models/product';
import { addProductToCart } from '../store/product.action';
import { selectCartItem } from '../store/product.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList: Product[] = [];
  billAmount = 0;

  constructor(
    private store: Store,
  ) {
    this.store.pipe(select(selectCartItem)).subscribe((products: Product[]) => {
      this.cartList = JSON.parse(JSON.stringify(products));
    });
  }

  ngOnInit(): void {
    this.calculateBill();
  }

  deleteItem(index: number) {
    this.cartList.splice(index, 1);
    this.store.dispatch(addProductToCart({ cartItem: this.cartList }));
    this.calculateBill();
  }

  updateCartData(index: number, item: Product, flag: boolean) {
    flag ? item.cartDuplicateCount++ : item.cartDuplicateCount--;
    if (item.cartDuplicateCount <= 0) {
      this.deleteItem(index);
    }
    this.store.dispatch(addProductToCart({ cartItem: this.cartList }));
    this.calculateBill();
  }

  calculateBill() {
    this.billAmount = this.cartList.reduce((answer: number, item: Product) => {
      return answer += (item.cartDuplicateCount * item.price);
    }, 0);
  }

}
