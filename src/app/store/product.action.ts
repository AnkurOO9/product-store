import { createAction, props } from "@ngrx/store";
import { Product } from "src/models/product";

export const getAllProduct = createAction(
    "[Product] invoke product GET API"
);

export const getAllProductSuccess = createAction(
    "[Product] invoke product GET API success",
    props<{ response: Product[] }>()
);

export const getAllProductFail = createAction(
    "[Product] invoke product GET API fail",
    props<{ error: any }>()
);

export const addProductToCart = createAction(
    "[Product] product add to cart",
    props<{ cartItem: Product[] }>()
);
