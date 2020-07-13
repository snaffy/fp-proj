import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../core/services/product.service';
import {ProductFilterComponent} from '../product-filter/product-filter.component';
import {PaginationConfig} from './model/pagination-config';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AuthService} from '../../core/auth/services/auth.service';

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
  currentSelectedPage;
  private productsSubscription: Subscription;
  private subject: Subject<string>;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService) {
    this.paginationConfig = new PaginationConfig();
    this.currentSelectedPage = this.paginationConfig.page;
    this.subject = new Subject<string>();
  }

  ngOnInit(): void {
    this.productDataLoaded = false;
    this.productService.fetchFirstTenProducts();
    this.initializeProductsViewList();
    this.subscribeToParamFilterChanges();
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.productFilterComponent.searchForm$.asObservable().subscribe(value => {
      this.productService.filterProductsBy(value);
    });
  }

  pageChanged($event: PageChangedEvent): void {
    this.currentSelectedPage = $event.page;
    this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        queryParams: {_page: $event.page, _itemsPerPage: $event.itemsPerPage}, queryParamsHandling: 'merge'
      });
  }

  private initializeProductsViewList(): void {
    this.productsSubscription = this.productService.getProducts().subscribe(value => {
      this.products = value.products;
      this.paginationConfig.totalItems = value.productCount;
      this.productDataLoaded = true;
    });
  }

  private subscribeToParamFilterChanges(): void {
    this.activatedRoute.queryParams
      .pipe(filter(value => !this.searchParamsAreEmpty(value)))
      .subscribe(params => {
        const page = +params._page || this.paginationConfig.page;
        const itemsPerPage = +params._itemsPerPage || this.paginationConfig.pageSize;
        const filterQuery = params._q;
        this.currentSelectedPage = page;
        this.productService.paginateProducts(page, itemsPerPage, filterQuery);
      });
  }

  private searchParamsAreEmpty(obj): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}

