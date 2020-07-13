import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {Product} from '../../model/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../core/services/contact.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html'
})
export class AdminProductFormComponent implements OnInit {

  @Output()
  saveEmitter = new EventEmitter<Product>();
  productForm: FormGroup;
  wasSubmitted = false;
  @Input()
  shouldFormBeResetAfterSaveEmit: boolean;
  @Input()
  private product$: Observable<Product>;

  constructor(public elementRef: ElementRef,
              private formBuilder: FormBuilder,
              private contactService: ContactService,
              private location: Location) {
  }

  get form() {
    return Object.assign({}, this.productForm);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.product$.subscribe(value => {
      this.updateFormValues(value);
    });
  }

  save(): void {
    this.wasSubmitted = true;
    if (this.productForm.invalid) {
      return;
    }

    this.saveEmitter.emit(this.createProductFromInput());

    if (this.shouldFormBeResetAfterSaveEmit) {
      this.resetForm();
    }
  }

  toPreviouslyPage(): void {
    this.location.back();
  }

  private resetForm(): void {
    this.wasSubmitted = false;
    this.productForm.reset();
  }

  private createProductFromInput(): Product {
    const controls = this.productForm.controls;
    return {
      id: controls.id.value,
      name: controls.name.value,
      price: controls.price.value,
      description: controls.description.value
    };
  }

  private updateFormValues(value: Product): void {
    this.productForm.patchValue({
      id: value.id,
      name: value.name,
      description: value.description,
      price: value.price,
    });
  }

  private initializeForm(): void {
    this.productForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }
}
