import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../core/services/product.service';
import {Product} from '../../model/product';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {OrderModalComponent} from '../order-modal/order-modal.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild(OrderModalComponent)
  orderModalComponent: OrderModalComponent;

  product$: Observable<Product>;

  constructor(private eventDetailsService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initProductDetails();
  }

  openOrderProductModal(): void {
    this.orderModalComponent.openOrderProductModal(this.getProductId());
  }

  private initProductDetails(): void {
    this.product$ = this.eventDetailsService.getProductById(this.getProductId());
  }

  private getProductId(): string {
    return this.route.snapshot.params['id'];
  }
}
