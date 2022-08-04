import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { UtilsService } from 'src/shared/services/utils.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList: Product[] = [];
  billAmount = 0;

  constructor(
    private utilsService: UtilsService,
    private productService: ProductService,
  ) {
    this.productService.getCartList().subscribe((res: Product[]) => {
      this.cartList = res;
    });
  }

  ngOnInit(): void {
    this.calculateBill();
  }

  deleteItem(index: number) {
    this.cartList.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartList));
    this.utilsService.reflactCartCount$.next(this.cartList.length);
    this.calculateBill();
  }

  updateCartData(index: number, item: Product, flag: boolean) {
    flag ? item.cartDuplicateCount++ : item.cartDuplicateCount--;
    if (item.cartDuplicateCount <= 0) {
      this.deleteItem(index);
    }
    localStorage.setItem('cart', JSON.stringify(this.cartList));
    this.calculateBill();
  }

  calculateBill() {
    this.billAmount = this.cartList.reduce((answer: number, item: Product) => {
      return answer += (item.cartDuplicateCount * item.price);
    }, 0);
  }

}
