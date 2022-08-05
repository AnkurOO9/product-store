import { createReducer, on } from "@ngrx/store";
import { Product } from "src/models/product";
import { addProductToCart, getAllProductSuccess } from "./product.action";

export const initialProductState: ReadonlyArray<Product> = [];
export const initialCartState: ReadonlyArray<Product> = [];

export const featureKey = {
    productFeatureKey: 'Product',
    cartFeatureKey: 'Cart'
}

export const productReducer = createReducer(
    initialProductState,
    on(getAllProductSuccess, (state, { response }) => {
        return response;
    })
);

export const cartReducer = createReducer(
    initialCartState,
    on(addProductToCart, (state, action) => {
        return [
            ...action.cartItem
        ];
    })
);