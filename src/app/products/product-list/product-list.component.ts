import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../core/services/product.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductFilterComponent} from '../product-filter/product-filter.component';
import {PaginationConfig} from './model/pagination-config';
import {Products} from '../../model/products';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Array<Product>;
  products$: Observable<Array<Product>>;
  @ViewChild(ProductFilterComponent)
  productFilterComponent: ProductFilterComponent;
  paginationConfig: PaginationConfig;
  productDataLoaded = false;

  constructor(private productService: ProductService) {
    this.paginationConfig = new PaginationConfig(1, 10, 100);
  }

  ngOnInit(): void {
    this.productService.fetchProducts();
    this.initializeProductsViewList();
    this.initializePaginationConfig();
  }

  ngAfterViewInit(): void {
    this.productFilterComponent.searchForm$.subscribe(value => {
      this.productService.filterProductsBy(value);
    });
  }

  private initializePaginationConfig(): void {
    console.log( this.productService.getProducts().asObservable().subscribe(value => console.log(value)));

    //   .subscribe(value => {
    //   this.paginationConfig = new PaginationConfig(1, 10, value.length);
    // });
  }

  pageChanged($event: PageChangedEvent): void {
    this.productService.paginateProducts($event.page, $event.itemsPerPage);
    this.products$.subscribe(value => {
      console.log(value);
    });
  }

  private initializeProductsViewList(): void {
    this.productService.getProducts().subscribe(value => {
      this.products = value;
      this.productDataLoaded = true;
    });
  }
}

