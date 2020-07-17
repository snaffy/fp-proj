export interface ModalResult {
  valid: boolean;
  title: string;
  body: string;
}

export class ModalResultFactory {
  static addProductValid(): ModalResult {
    return {valid: true, title: 'Success!', body: 'Product has been created correctly.'};
  }

  static addProductInValid(): ModalResult {
    return {valid: false, title: 'Failure!', body: 'Product has been created correctly.'};
  }

  static editProductValid(): ModalResult {
    return {valid: true, title: 'Success!', body: 'Product has been edited correctly.'};
  }

  static editProductInValid(): ModalResult {
    return {valid: true, title: 'Failure!', body: 'Product has been edited correctly.'};
  }

  static editProductNotingChanged(): ModalResult {
    return {valid: true, title: 'Information', body: 'Nothing has changed.'};
  }

}
