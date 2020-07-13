import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Message} from '../../model/message';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiUrl} from '../../model/api-url';
import {PaginationRequestFactory} from '../common/pagination-request-factory';
import {Messages} from '../../model/messages';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _messages$ = new BehaviorSubject<Messages>(new Messages([], 0));

  constructor(private httpClient: HttpClient) {
  }

  get messages(): Observable<Messages> {
    return this._messages$.asObservable();
  }

  fetchMessages(page: number, limit?: number): void {
    const request = PaginationRequestFactory.createRequest(page, limit);
    this.sentPaginationRequest(request);
  }

  addMessage(message: Message): void {
    this.httpClient.post<Message>(`${ApiUrl.BASE_URL}/contact`, message)
      .subscribe(value =>
        error => console.error('Could not fetch data from api.', error)
      );
  }

  private sentPaginationRequest(request: string): void {
    this.httpClient.get<Array<Message>>(`${ApiUrl.BASE_URL}/contact?${request}`, {observe: 'response'}).subscribe(
      data => {
        this._messages$.next(new Messages(data.body, +data.headers.get('X-Total-Count')));
      },
      error => console.error('Could not fetch data from api.', error)
    );
  }
}
