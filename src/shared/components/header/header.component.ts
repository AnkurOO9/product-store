import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectCartItem } from 'src/app/store/product.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    public store: Store,
  ) { }

  cartItemCount = 0;

  ngOnInit(): void {
    this.store.pipe(select(selectCartItem)).subscribe(cartItems => {
      this.cartItemCount = cartItems.length;
    })
  }

  navigateToCart(path: string) {
    this.router.navigate([path]);
  }

}
