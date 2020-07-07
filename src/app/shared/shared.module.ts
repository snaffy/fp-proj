import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormErrorHandlerComponent } from './form-error-handler/form-error-handler.component';

@NgModule({
  declarations: [FormErrorHandlerComponent],
  exports: [
    FormErrorHandlerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {}
