import {Product} from './product';

export class Products {
  private _productCount: number;
  private _products: Array<Product>;


  constructor(products: Array<Product>, productCount?: number ) {
    this._productCount = productCount;
    this._products = products;
  }

  get productCount(): number {
    if (this._productCount === undefined){
      return this._products.length;
    }

    return this._productCount;
  }

  get products(): Array<Product> {
    return this._products;
  }
}
