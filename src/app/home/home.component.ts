import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/models/product';
import { UtilsService } from 'src/shared/services/utils.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productList: Product[] = [];
  cartList: Product[] = [];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private utilsService: UtilsService,
  ) {
    this.productService.getCartList().subscribe((res: Product[]) => {
      this.cartList = res;
    });
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe((res: Product[]) => {
      this.productList = res;
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
    localStorage.setItem('cart', JSON.stringify(this.cartList));
    this.snackBar.open('Product added to cart', '', { duration: 1000 });
    this.utilsService.reflactCartCount$.next(this.cartList.length);
    setTimeout(() => {
      item.isProgressBar = false;
    }, 500);
  }

}
