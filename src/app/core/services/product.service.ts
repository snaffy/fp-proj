import {Inject, Injectable} from '@angular/core';
import {Product} from '../../model/product';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {APP_BASE_HREF, LocationStrategy} from '@angular/common';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products$ = new BehaviorSubject<Array<Product>>([]);
  private _baseUrl = '/api';

  constructor(private httpClient: HttpClient) {}

  fetchProducts(): void {
    this.httpClient.get<Array<Product>>(`${this._baseUrl}/products`).subscribe(
      data => {
        this._products$.next(data);
      },
      error => console.error('Could not fetch data from api.',  error)
    );
  }

  getAllProducts(): Observable<Array<Product>> {
    return this._products$.asObservable();
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get <Product>(`${this._baseUrl}/products/${id}`);
  }
}
