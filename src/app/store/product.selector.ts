import { createFeatureSelector } from "@ngrx/store";
import { Product } from "src/models/product";
import { featureKey } from "./product.reducer";

export const selectProduct = createFeatureSelector<Product[]>(featureKey.productFeatureKey);

export const selectCartItem = createFeatureSelector<Product[]>(featureKey.cartFeatureKey);