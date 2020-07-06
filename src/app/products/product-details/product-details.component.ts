import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../core/services/product.service';
import {Product} from '../../model/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;

  constructor(private eventDetailsService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.initProductDetails(productId);
  }

  private initProductDetails(productId): void {
    this.eventDetailsService.getProductById(productId).subscribe(product => {
        this.product = product;
      },
      error => {
        console.log(error);
      });
  }


}
