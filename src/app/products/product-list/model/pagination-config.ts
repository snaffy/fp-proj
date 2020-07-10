export class PaginationConfig {
  private _page = 1;
  private _pageSize = 10;
  private _totalItems = 10;

  constructor(totalItems?: number, page?: number, pageSize?: number) {
    this._page = page;
    this._pageSize = pageSize;
    this._totalItems = totalItems;
  }

  set totalItems(value: number) {
    this._totalItems = value;
  }

  get page() {
    return this._page;
  }

  get pageSize() {
    return this._pageSize;
  }

  get totalItems() {
    return this._totalItems;
  }

}
