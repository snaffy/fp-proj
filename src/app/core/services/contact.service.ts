import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Message} from '../../model/message';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _baseUrl = '/api';

  constructor(private httpClient: HttpClient) {
  }

  addContact(message: Message): void {
    this.httpClient.post<Message>(`${this._baseUrl}/contact`, message)
      .subscribe(value =>
        error => console.error('Could not fetch data from api.', error)
      );
  }
}
