export interface OrderDetails {
  name: string;
  quantity: number;
  pricePerUnit: number;
}

export class OrderSummary {
  private _orderDetails: Array<OrderDetails>;

  constructor(orderDetails: Array<OrderDetails>) {
    this._orderDetails = orderDetails;

  }

  get orderDetails(): Array<OrderDetails> {
    return this._orderDetails;
  }

  get summary(): number {
    let sum = 0.0;
    this.orderDetails.forEach(productDetails => {
      sum = sum + (productDetails.quantity * productDetails.pricePerUnit);
    });
    return sum;
  }

  get isEmpty(): boolean {
    return this._orderDetails.length <= 0;
  }

}
