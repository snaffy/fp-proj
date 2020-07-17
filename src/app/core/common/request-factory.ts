import {of} from 'rxjs';

export class RequestFactory {
  static createPaginationRequest(page: number, limit: number, filterQuery?: string): string {
    let request = `_page=${page}&_limit=${limit}`;
    if (filterQuery) {
      request = `q=${filterQuery}&` + request;
    }
    return request;
  }

  static createByIdsRequest(ids: Array<string>): string {
    let request = '';
    ids.forEach(value => {
      request = request + `id=${value}&`;
    });
    request = request.slice(0, -1);
    return request;
  }
}
