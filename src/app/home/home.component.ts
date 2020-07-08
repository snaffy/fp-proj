import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../core/services/product.service';
import {interval, Subscription} from 'rxjs';
import {Products} from '../model/products';
import {ProductRangeGeneratorService} from './product-range-generator.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProductRangeGeneratorService]
})
export class HomeComponent implements OnInit, OnDestroy {

  productDataLoaded;
  products: Products;
  private productsSubscription: Subscription;

  constructor(private productService: ProductService, private productRangeGeneratorService: ProductRangeGeneratorService) {
  }

  ngOnInit(): void {
    this.productService.paginateProducts(1, 3);
    this.subscribeToProducts();
    this.reloadProductsEvery(10000);
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  private subscribeToProducts(): void {
    this.productsSubscription = this.productService.getProducts().subscribe(value => {
      this.products = value;
      this.productDataLoaded = true;
    });
  }

  private reloadProductsEvery(period: number): void {
    interval(period).subscribe(x => {
      this.randomizeNextProducts();
    });
  }

  private randomizeNextProducts(): void {
    if (this.products === undefined) {
      return;
    }
    const productCount = this.products.productCount;
    if (this.productRangeGeneratorService.canBeGenerate(productCount)) {
      const sliceRange = this.productRangeGeneratorService.generate(productCount);
      this.productService.sliceProducts(sliceRange.start, sliceRange.end);
    }
  }


}
