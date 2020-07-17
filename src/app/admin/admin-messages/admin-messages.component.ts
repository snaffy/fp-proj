import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../core/services/contact.service';
import {Message} from '../../model/message';
import {Observable} from 'rxjs';
import {Messages} from '../../model/messages';
import {PaginationConfig} from '../../products/product-list/model/pagination-config';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html'
})
export class AdminMessagesComponent implements OnInit {

  messages: Array<Message>;
  paginationConfig: PaginationConfig;
  private _messages$: Observable<Messages>;

  constructor(private contactService: ContactService) {
    this.paginationConfig = new PaginationConfig();
  }

  ngOnInit(): void {
    this._messages$ = this.contactService.messages;
    this.contactService.fetchMessages(1, 10);
    this.initializeMessageViewList();
  }

  pageChanged($event: PageChangedEvent): void {
    this.contactService.fetchMessages($event.page, this.paginationConfig.pageSize);
  }

  private initializeMessageViewList(): void {
    this._messages$.subscribe(value => {
      this.messages = value.messages;
      this.paginationConfig.totalItems = value.messagesCount;
    });
  }
}
