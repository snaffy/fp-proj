export class PaginationConfig {
  private _page;
  private _pageSize;
  private _totalItems;


  constructor(page, pageSize, totalItems) {
    this._page = page;
    this._pageSize = pageSize;
    this._totalItems = totalItems;
  }


  set totalItems(value) {
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
