import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import io from 'socket.io-client';

export interface ChatMessage {
  id: string;
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
  private apiUrl = `${environment.backendUrl}/chat`;
  private socket;
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient, private ngZone: NgZone) {
    this.socket = io(environment.backendUrl, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000
    });
    this.initializeWebSocketListeners();
  }

  getMessages(): Observable<ChatMessage[]> {
    this.http.get<ChatMessage[]>(this.apiUrl).subscribe(messages => {
      this.ngZone.run(() => {
        this.messagesSubject.next(messages);
      });
    }, error => console.error('Failed to fetch messages:', error));
    return this.messages$;
  }

  private initializeWebSocketListeners(): void {
    this.socket.on('connect', () => console.log('Connected to Socket.IO server for chat'));
    this.socket.on('connect_error', (error) => console.error('Chat connection error:', error));

    this.socket.on('message-created', (newMessage: ChatMessage) => {
      this.ngZone.run(() => {
        const currentMessages = this.messagesSubject.value;
        this.messagesSubject.next([...currentMessages, newMessage]);
      });
    });

    this.socket.on('message-updated', (updatedMessage: ChatMessage) => {
      this.ngZone.run(() => {
        const currentMessages = this.messagesSubject.value;
        const index = currentMessages.findIndex(msg => msg.id === updatedMessage.id);
        if (index !== -1) {
          // Immutable update using map to create a new array
          const updatedMessages = currentMessages.map(msg =>
            msg.id === updatedMessage.id ? { ...msg, ...updatedMessage } : msg
          );
          this.messagesSubject.next(updatedMessages);
        } else {
          console.log("Message with ID not found:", updatedMessage.id);
        }
      });
    });

    this.socket.on('message-deleted', (data: { id: string }) => {
      this.ngZone.run(() => {
        const currentMessages = this.messagesSubject.value;
        // Filter to create a new array without the deleted message
        const updatedMessages = currentMessages.filter(msg => msg.id !== data.id);
        this.messagesSubject.next(updatedMessages);
      });
    });
  }
}
