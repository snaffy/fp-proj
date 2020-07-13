export class PaginationRequestFactory {
  static createRequest(page: number, limit: number, filterQuery?: string): string {
    let request = `_page=${page}&_limit=${limit}`;
    if (filterQuery) {
      request = `q=${filterQuery}&` + request;
    }
    return request;
  }
}
