import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ChatMessage {
  id: number;
  text: string;
  isIncoming: boolean;
  isOnline: boolean;
  time: Date;
  contactName: string;
  iconImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() {}

  getMessages(): Observable<ChatMessage[]> {
    const dummyMessages: ChatMessage[] = [
      { id: 1, text: "Hi there!", isIncoming: true, isOnline: true, time: new Date(), contactName: "Alice", iconImage: "assets/like2.jpg" },
      { id: 2, text: "Hello Bob!", isIncoming: false, isOnline: false, time: new Date(), contactName: "Bob", iconImage: "assets/chat1.jpg" },
      { id: 3, text: "NOoooooo!!", isIncoming: true, isOnline: true, time: new Date(), contactName: "Jack", iconImage: "assets/chat2.jpg" },
      { id: 4, text: ":D XD", isIncoming: true, isOnline: false, time: new Date(), contactName: "Mr. Robot", iconImage: "assets/chat3.jpg" },
    ];
    return of(dummyMessages).pipe(delay(1000));
  }
}
