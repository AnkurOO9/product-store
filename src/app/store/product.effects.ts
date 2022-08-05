import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { Product } from "src/models/product";
import { ProductService } from "../services/product.service";
import { getAllProduct, getAllProductFail, getAllProductSuccess } from "./product.action";

@Injectable()
export class ProductEffect {
    constructor(
        private action$: Actions,
        private productService: ProductService,
    ) { }

    getAllProduct$ = createEffect(() => {
        return this.action$.pipe(
            ofType(getAllProduct),
            switchMap(() => {
                return this.productService.getProductList().pipe(
                    map((data: Product[]) => getAllProductSuccess({
                        response: data.map((item: Product) => {
                            item.isProgressBar = false;
                            return item;
                        })
                    })),
                    catchError(
                        error => of(getAllProductFail({ error: error }))
                    )
                );
            })
        );
    });
}