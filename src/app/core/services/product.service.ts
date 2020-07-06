import {Injectable} from '@angular/core';
import {Product} from '../../model/product';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products: Array<Product> = [
    {id: '1', name: 'Product_1', description: 'Description_1', price: 2.3},
    {id: '2', name: 'Product_2', description: 'Description_2', price: 0.0},
    {id: '3', name: 'Product_3', description: 'Description_3', price: 2.3},
    {id: '4', name: 'Product_4', description: 'Description_4', price: 0.4},
    {id: '5', name: 'Product_5', description: 'Description_5', price: 10.3},
    {id: '6', name: 'Product_6', description: 'Description_6', price: 40.3}
  ];

  constructor() {
  }

  getAllProducts(): Observable<Array<Product>> {
    return of(this._products);
  }

  getProductById(id: string): Observable<Product> {
    const product = this._products.find(p => p.id === id);
    return of(product);
  }
}
