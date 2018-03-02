import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor() { }

  messages: string[] = [];

  add(message: string) {
  	this.messages.push(message);
  	document.getElementById('new-message-btn').click()
  }

  clear() {
  	this.messages = [];
  }

}
