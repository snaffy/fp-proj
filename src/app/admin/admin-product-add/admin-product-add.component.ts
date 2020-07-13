import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../core/services/product.service';
import {Product} from '../../model/product';
import {Observable, of, Subject} from 'rxjs';
import {ModalResult, ModalResultFactory} from '../product-form--modal/modal-result';


@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html'
})
export class AdminProductAddComponent implements OnInit {

  product$: Observable<Product> = of({name: '', description: '', price: 0.0});

  constructor(private productService: ProductService) {
    this._operationResultAsModal$ = new Subject<ModalResult>();
  }

  private _operationResultAsModal$: Subject<ModalResult>;

  get operationResultAsModal$(): Observable<ModalResult> {
    return this._operationResultAsModal$.asObservable();
  }

  ngOnInit(): void {
  }

  save($event: Product): void {
    this.productService.add($event).subscribe(value => this.emitShowModalEventBasedOnResult(value));
  }

  private emitShowModalEventBasedOnResult(product: Product): void {
    const isValid = !!product;
    if (isValid) {
      this._operationResultAsModal$.next(ModalResultFactory.addProductValid());
    } else {
      this._operationResultAsModal$.next(ModalResultFactory.addProductValid());
    }
  }
}
