import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.services';
import { ChatService, ChatMessage } from '../services/chat.services';

@Component({
  selector: 'app-chats-page',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss']
})
export class ChatsPage implements OnInit {
  matches: any[] = [];

  messages: ChatMessage[] = [];
  incomingMessagesCount = 0;
  matchesCount = 0;
  readonly placeholdersCount = 5;
  activeTab: string = 'chats';

  constructor(
    private matchService: MatchService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.loadMatches();
    this.loadMessages();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  private loadMatches(): void {
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
    );
  }

  private loadMessages(): void {
    this.chatService.getMessages().subscribe(
      data => {
        this.messages = data;
        this.incomingMessagesCount = data.filter(m => m.isIncoming).length;
      },
      error => console.error('Failed to fetch messages', error)
    );
  }

  private fillPlaceholders(data: any[]): any[] {
    const filledData = data.length ? data : [];
    while (filledData.length < this.placeholdersCount) {
      filledData.push({ name: '', profilePicture: 'assets/placeholder.jpg', isOnline: false });
    }
    return filledData;
  }

  private createPlaceholders(): any[] {
    return new Array(this.placeholdersCount).fill({}).map(() => ({
      name: 'Unknown',
      profilePicture: 'assets/placeholder.jpg',
      isOnline: false
    }));
  }

  get displayedMatches(): any[] {
    return this.matches;
  }

  private updateMatchCount(): void {
    this.matchesCount = this.matches.filter(match => match.name && match.name !== 'Unknown').length;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/NoAvatar.jpeg';
  }
}
