import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../core/services/product.service';
import {Product} from '../../model/product';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {

  product$: Observable<Product>;

  constructor(private eventDetailsService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.initProductDetails(productId);
  }

  private initProductDetails(productId): void {
    this.product$ = this.eventDetailsService.getProductById(productId);
  }


}
