import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../core/services/product.service';
import {Product} from '../../model/product';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import {ModalResult, ModalResultFactory} from '../product-form--modal/modal-result';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html'
})
export class AdminProductEditComponent implements OnInit {

  product$: Observable<Product>;
  private _productBeforeChange: Product;
  private _operationResultAsModal$: Subject<ModalResult>;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {
    this._operationResultAsModal$ = new Subject<ModalResult>();
  }

  get operationResultAsModal$(): Observable<ModalResult> {
    return this._operationResultAsModal$.asObservable();
  }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params.id;
    this.product$ = this.productService.getProductById(productId).pipe(
      tap(product => this._productBeforeChange = product));
  }

  edit($event: Product): void {
    if (this.wasProductChanged($event)) {
      this.productService.edit($event).subscribe(value => {
        this.emitShowModalEventBasedOnResult(value);
      });
    } else {
      this._operationResultAsModal$.next(ModalResultFactory.editProductNotingChanged());
    }
  }

  private wasProductChanged(product: Product): boolean {
    return (this._productBeforeChange.name !== product.name) ||
      (this._productBeforeChange.description !== product.description) ||
      (this._productBeforeChange.quantity !== product.quantity) ||
      (this._productBeforeChange.price !== product.price);
  }

  private emitShowModalEventBasedOnResult(product: Product): void {
    const isValid = !!product;
    if (isValid) {
      this._operationResultAsModal$.next(ModalResultFactory.editProductValid());
    } else {
      this._operationResultAsModal$.next(ModalResultFactory.editProductInValid());
    }
  }
}
