import {Injectable} from '@angular/core';
import {Product} from '../../model/product';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Products} from '../../model/products';
import {ApiUrl} from '../../model/api-url';
import {RequestFactory} from '../common/request-factory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products$ = new BehaviorSubject<Products>(new Products([], 0));

  constructor(private httpClient: HttpClient) {
  }

  fetchFirstTenProducts(): void {
    this.paginateProducts(1, 10);
  }

  filterProductsBy(filterQuery: string): void {
    if (!filterQuery) {
      this.fetchFirstTenProducts();
      return;
    }
    this.sendFilterRequest(filterQuery);
  }

  paginateProducts(page: number, limit?: number, filterQuery?: string): void {
    const request = RequestFactory.createPaginationRequest(page, limit, filterQuery);
    this.sentPaginationRequest(request);
  }

  sliceProducts(start: number, end: number): void {
    this.httpClient.get<Array<Product>>(`${ApiUrl.BASE_URL}/products?_start=${start}&_end=${end}`, {observe: 'response'}).subscribe(
      data => {
        this._products$.next(new Products(data.body, +data.headers.get('X-Total-Count')));
      },
      error => console.error('Could not fetch data from api.', error)
    );
  }

  edit(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${ApiUrl.BASE_URL}/products/${product.id}`, product);
  }

  getProducts(): Observable<Products> {
    return this._products$.asObservable();
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get <Product>(`${ApiUrl.BASE_URL}/products/${id}`);
  }

  getProductByIds(ids: Array<string>): Observable<Array<Product>> {
    if (ids.length <= 0) {
      return of();
    }
    return this.httpClient.get<Array<Product>>(`${ApiUrl.BASE_URL}/products?${RequestFactory.createByIdsRequest(ids)}`);
  }

  add(product: Product): Observable<Product> {

    return this.httpClient.post<Product>(`${ApiUrl.BASE_URL}/products`, product);
  }

  private sentPaginationRequest(request: string): void {
    this.httpClient.get<Array<Product>>(`${ApiUrl.BASE_URL}/products?${request}`, {observe: 'response'}).subscribe(
      data => {
        this._products$.next(new Products(data.body, +data.headers.get('X-Total-Count')));
      },
      error => console.error('Could not fetch data from api.', error)
    );
  }

  private sendFilterRequest(filterQuery: string): void {
    this.httpClient.get<Array<Product>>(`${ApiUrl.BASE_URL}/products?q=${filterQuery}`).subscribe(
      data => {
        this._products$.next(new Products(data));
      },
      error => console.error('Could not fetch data from api.', error)
    );
  }
}
