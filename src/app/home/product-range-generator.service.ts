import {Injectable} from '@angular/core';
import {SliceRange} from './slice-range';

@Injectable()
export class ProductRangeGeneratorService {

  constructor() {
  }

  private _sliceRange = 3;

  canBeGenerate(productCount: number): boolean {
    return productCount > 0;
  }

  generate(productCount: number): SliceRange {
    if (productCount <= 0) {
      throw new Error('Unable to generate product range. Product count ' + productCount);
    }
    let startRange: number;
    let endRange: number;
    if (productCount < 3) {
      startRange = 1;
      endRange = productCount;
    } else {
      startRange = this.random(1, productCount - this._sliceRange);
      endRange = startRange + this._sliceRange;
    }

    return {start: startRange, end: endRange};
  }

  private random(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
