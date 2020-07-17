import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ErrorMessageMapping} from './model/error-message-mapping';

@Component({
  selector: 'app-form-error-handler',
  templateUrl: './form-error-handler.component.html'
})
export class FormErrorHandlerComponent implements OnInit, OnChanges {

  @Input()
  form: FormGroup;
  @Input()
  wasSubmitted = false;
  @Input()
  errMapping: Array<ErrorMessageMapping>;
  @Input()
  parentRef: ElementRef;

  constructor(private renderer2: Renderer2) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const controls = this.form.controls;
    this.removePreviouslyCreatedErrDivs();
    for (const field in controls) {
      if (!this.fieldIsDefinedInErrorMapping(field + 'Id')){
        continue;
      }
      const controlField = controls[field];
      if (this.fieldHasError(controlField)) {
        Object.keys(controlField.errors).forEach(validatorType => {
          this.createErrDivsAndMarkAsInvalid(field, validatorType);
        });
      } else {
        this.markFieldAsValid(field + 'Id');
      }
    }
  }

  private fieldIsDefinedInErrorMapping(field: string): boolean {
    const containsElement = this.errMapping.filter(value => value.fieldId === field).length;
    return containsElement > 0;
  }

  private fieldHasError(controlField: AbstractControl): boolean {
    if ((controlField.dirty && controlField.errors) || (this.wasSubmitted && controlField.errors)) {
      return true;
    }
    return false;
  }

  private markFieldAsInvalid(fieldId): void {
    const invalidField = this.parentRef.nativeElement.querySelector(`#` + fieldId);
    this.renderer2.addClass(invalidField, 'is-invalid');
  }

  private markFieldAsValid(fieldId): void {
    const invalidField = this.parentRef.nativeElement.querySelector(`#` + fieldId);
    this.renderer2.removeClass(invalidField, 'is-invalid');
  }

  private createDiv(fieldId: string, errMapping: ErrorMessageMapping): void {
    const errDivId = this.createErrDivIdFrom(errMapping);
    if (this.parentRef.nativeElement.querySelector(`#` + errDivId) !== null) {
      return;
    }
    const element = this.parentRef.nativeElement.querySelector(`#` + fieldId);
    const div = this.renderer2.createElement('div');
    const text = this.renderer2.createText(errMapping.invalidMessage);
    div.classList.add('invalid-feedback');
    div.id = errDivId;
    this.renderer2.appendChild(div, text);
    element.after(div);
  }

  private createErrDivIdFrom(errMapping: ErrorMessageMapping): string {
    return errMapping.fieldId + '-' + errMapping.validatorType;
  }

  private createErrDivsAndMarkAsInvalid(field: string, validatorType: string): void {
    const fieldId = field + 'Id';
    const errorMessage = this.getErrorMessage(fieldId, validatorType);
    this.createDiv(fieldId, errorMessage);
    this.markFieldAsInvalid(field + 'Id');
  }

  private getErrorMessage(fieldId: string, validatorType: string): ErrorMessageMapping {
    return this.errMapping.find(value => (value.fieldId === fieldId) && (value.validatorType === validatorType));
  }

  private removePreviouslyCreatedErrDivs(): void {
    this.errMapping.forEach(value => {
      this.removeErrDiv(this.createErrDivIdFrom(value));
    });
  }

  private removeErrDiv(divId: string): void {
    const element = this.parentRef.nativeElement.querySelector(`#` + divId);
    if (element === null) {
      return;
    }
    element.remove();
  }


}
