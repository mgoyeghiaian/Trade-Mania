import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatchService } from '../services/match.services';  // Ensure this path matches where your MatchService is located
import { ChatService, ChatMessage } from '../services/chat.services';  // Ensure this path matches where your ChatService is located

@Component({
  selector: 'app-chats-page',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss']
})
export class ChatsPage implements OnInit, OnDestroy {
  matches: any[] = [];
  messages: ChatMessage[] = [];
  incomingMessagesCount = 0;
  matchesCount = 0;
  readonly placeholdersCount = 5;
  activeTab: string = 'chats';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private matchService: MatchService,
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMatches();
    this.loadMessages();
    this.subscribeToRealTimeUpdates();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.cdr.detectChanges(); // Manually trigger change detection to ensure UI updates
  }

  private loadMatches(): void {
    this.subscriptions.add(
      this.matchService.getMatches().subscribe(
        data => {
          this.matches = this.fillPlaceholders(data);
          this.updateMatchCount();
        },
        error => {
          console.error('Failed to fetch matches', error);
          this.matches = this.createPlaceholders();
          this.updateMatchCount();
        }
      )
    );
  }

  private loadMessages(): void {
    this.subscriptions.add(
      this.chatService.getMessages().subscribe(
        data => {
          this.messages = data;
          this.incomingMessagesCount = data.filter(m => m.isIncoming).length;
          this.cdr.detectChanges();
        },
        error => console.error('Failed to fetch messages', error)
      )
    );
  }

  private subscribeToRealTimeUpdates(): void {
    // Subscribing to real-time message updates
    this.subscriptions.add(
      this.chatService.messages$.subscribe(newMessages => {
        this.messages = newMessages;
        this.incomingMessagesCount = newMessages.filter(m => m.isIncoming).length;
        this.cdr.detectChanges(); // Ensure the view is updated
      })
    );
  }

  private fillPlaceholders(data: any[]): any[] {
    const filledData = data.length ? data : [];
    while (filledData.length < this.placeholdersCount) {
      filledData.push({ name: '', profilePicture: 'assets/NoAvatar.jpeg', isOnline: false });
    }
    return filledData;
  }

  private createPlaceholders(): any[] {
    return new Array(this.placeholdersCount).fill({}).map(() => ({
      name: 'Unknown',
      profilePicture: 'assets/NoAvatar.jpeg',
      isOnline: false
    }));
  }

  private updateMatchCount(): void {
    this.matchesCount = this.matches.filter(match => match.name && match.name !== 'Unknown').length;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/NoAvatar.jpeg';
  }
}
