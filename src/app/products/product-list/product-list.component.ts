import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../core/services/product.service';
import {ProductFilterComponent} from '../product-filter/product-filter.component';
import {PaginationConfig} from './model/pagination-config';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(ProductFilterComponent)
  productFilterComponent: ProductFilterComponent;
  products: Array<Product>;
  paginationConfig: PaginationConfig;
  productDataLoaded;
  private productsSubscription: Subscription;
  private subject: Subject<string>;
  private filterQuery: string;

  constructor(private productService: ProductService) {
    this.paginationConfig = new PaginationConfig();
    this.subject = new Subject<string>();
  }

  ngOnInit(): void {
    this.productDataLoaded = false;
    this.productService.fetchFirstTenProducts();
    this.initializeProductsViewList();
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.productFilterComponent.searchForm$.asObservable().subscribe(value => {
      this.filterQuery = value;
      this.productService.filterProductsBy(value);
    });
  }

  pageChanged($event: PageChangedEvent): void {
    this.productService.paginateProducts($event.page, $event.itemsPerPage, this.filterQuery);
  }

  private initializeProductsViewList(): void {
    this.productsSubscription = this.productService.getProducts().subscribe(value => {
      this.products = value.products;
      this.paginationConfig.totalItems = value.productCount;
      this.productDataLoaded = true;
    });
  }
}

