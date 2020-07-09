import {ErrorMessageMapping} from './error-message-mapping';

export class ErrorsMessageMapping {
  errorsMessageMapping: Array<ErrorMessageMapping>;


  constructor(errorsMessageMapping: Array<ErrorMessageMapping>) {
    this.errorsMessageMapping = errorsMessageMapping;
  }
}
