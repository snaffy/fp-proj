import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../core/services/product.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Array<Product>>;

  constructor(private productService: ProductService) {
    this.products$ = productService.getAllProducts();
    this.productService.fetchProducts();
  }

  ngOnInit(): void {
  }

}
