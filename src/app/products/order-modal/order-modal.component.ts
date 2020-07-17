import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../core/services/product.service';
import {Product} from '../../model/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductOrderService} from '../../core/services/product-order.service';
import {switchMap} from 'rxjs/operators';
import {Observable, of, Subscription} from 'rxjs';
import {Order} from '../../model/order';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html'
})
export class OrderModalComponent implements OnInit, OnDestroy {
  @ViewChild('orderModal')
  modalRef: NgbModalRef;
  selectedProduct: Product;
  orderProductForm: FormGroup;
  private productServiceSubscription: Subscription;
  private orderServiceSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private productOrderService: ProductOrderService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.productServiceSubscription !== undefined) {
      this.productServiceSubscription.unsubscribe();
    }
    if (this.orderServiceSubscription !== undefined) {
      this.orderServiceSubscription.unsubscribe();
    }
  }

  openOrderProductModal(productId: string): void {
    this.productService.getProductById(productId).subscribe(product => {
      this.openModal(product);
    });
  }

  closeProductModal(closeClick: string): void {
    this.modalService.dismissAll(closeClick);
    this.ngOnDestroy();
  }

  onSubmit(): void {
    if (this.orderProductForm.invalid) {
      return;
    }
    this.makeOrder();
    this.closeProductModal('Close click');
    this.ngOnDestroy();
  }

  private makeOrder(): void {
    const controls = this.orderProductForm.controls;
    this.productOrderService.order({
      productId: controls.id.value,
      quantity: controls.quantity.value
    });
  }

  private openModal(selectedProduct: Product): void {
    this.orderServiceSubscription = this.createOrderForm(selectedProduct).subscribe(maxQuantityValidator => {
      this.initializeForm(maxQuantityValidator);
      this.modalService.open(this.modalRef);
    });
  }

  private createOrderForm(selectedProduct: Product): Observable<Product> {
    return this.productOrderService.orders.pipe(switchMap(allOrders => {
      return of(this.getMaxAllowedQuantityToPurchase(selectedProduct, allOrders));
    }));
  }

  private initializeForm(selectedProduct: Product): void {
    this.selectedProduct = selectedProduct;
    this.orderProductForm = this.formBuilder.group({
      id: [this.selectedProduct.id, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(selectedProduct.quantity)]],
    });
  }

  private getMaxAllowedQuantityToPurchase(selectedProduct: Product, allOrders: Array<Order>): Product {
    if (!allOrders || allOrders.length === 0) {
      return selectedProduct;
    } else {
      const currentOrdered = allOrders
        .filter(order => order.productId === selectedProduct.id)[0];

      if (currentOrdered === undefined) {
        return selectedProduct;
      }
      selectedProduct.quantity = selectedProduct.quantity - currentOrdered.quantity;
      return selectedProduct;
    }
  }
}
