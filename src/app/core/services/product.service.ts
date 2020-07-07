import {Inject, Injectable} from '@angular/core';
import {Product} from '../../model/product';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {APP_BASE_HREF, LocationStrategy} from '@angular/common';
import {Router} from '@angular/router';
import {count} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products$ = new BehaviorSubject<Array<Product>>([]);
  private _baseUrl = '/api';
  countNumber: number;
  constructor(private httpClient: HttpClient) {
  }

  paginateProducts(page: number, limit: number): void {
    this.httpClient.get<Array<Product>>(`${this._baseUrl}/products?_page=${page}&?_limit=${limit}`).subscribe(
      data => {
        this._products$.next(data);
      },
      error => console.error('Could not fetch data from api.', error)
    );
  }

  fetchProducts(): void {
    this.httpClient.get<Array<Product>>(`${this._baseUrl}/products`).subscribe(
      data => {
        this._products$.next(data);
      },
      error => console.error('Could not fetch data from api.', error)
    );
  }

  filterProductsBy(filterQuery: string): void {
    this.httpClient.get<Array<Product>>(`${this._baseUrl}/products?q=${filterQuery}`).subscribe(
      data => {
        this._products$.next(data);
      },
      error => console.error('Could not fetch data from api.', error)
    );
  }

  getProducts(): BehaviorSubject<Array<Product>> {
    return this._products$;
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get <Product>(`${this._baseUrl}/products/${id}`);
  }
}
