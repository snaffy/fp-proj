import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ErrorMessageMapping} from './model/error-message-mapping';

@Component({
  selector: 'app-form-error-handler',
  templateUrl: './form-error-handler.component.html'
})
export class FormErrorHandlerComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  form: FormGroup;
  @Input()
  wasSubmitted = false;
  @Input()
  errorMessage: Array<ErrorMessageMapping>;
  @Input()
  parentRef: ElementRef;

  constructor(private renderer2: Renderer2) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createDivsWithInvalidMessages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const controls = this.form.controls;
    for (const field in controls) {
      if ((controls[field].dirty && controls[field].errors) || (this.wasSubmitted && controls[field].errors)) {
        this.markFieldAsInvalid(field + 'Id');
      } else {
        this.markFieldAsValid(field + 'Id');
      }
    }
  }

  private markFieldAsInvalid(field): void {
    const invalidField = this.parentRef.nativeElement.querySelector(`#` + field);
    this.renderer2.addClass(invalidField, 'is-invalid');
  }

  private markFieldAsValid(field): void {
    const invalidField = this.parentRef.nativeElement.querySelector(`#` + field);
    this.renderer2.removeClass(invalidField, 'is-invalid');
  }


  private createDivsWithInvalidMessages(): void {
    this.errorMessage.forEach(value => {
      this.createDiv(value);
    });
  }

  private createDiv(errors: ErrorMessageMapping): void {
    const invalidField = this.parentRef.nativeElement.querySelector(`#` + errors.fieldId);
    this.createInvalidMessage(invalidField, errors.invalidMessage);
  }

  createInvalidMessage(element, message): void {
    const div = this.renderer2.createElement('div');
    const text = this.renderer2.createText(message);
    div.classList.add('invalid-feedback');
    this.renderer2.appendChild(div, text);
    element.after(div);
  }


}
