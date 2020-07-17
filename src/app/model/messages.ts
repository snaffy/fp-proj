import {Message} from './message';

export class Messages {
  private _messagesCount: number;
  private _messages: Array<Message>;


  constructor(messages: Array<Message>, messagesCount: number) {
    this._messages = messages;
    this._messagesCount = messagesCount;
  }

  get messagesCount(): number {
    return this._messagesCount;
  }

  get messages(): Array<Message> {
    return this._messages;
  }
}
