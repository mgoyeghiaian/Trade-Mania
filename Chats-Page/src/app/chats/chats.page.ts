import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.services';

@Component({
  selector: 'app-chats-page',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss']
})
export class ChatsPage implements OnInit {
  matches: any[] = [];
  likes: any[] = [
    { name: 'Like1', image: 'assets/person1.jpg' },
    { name: 'Like2', image: 'assets/person2.jpg' }
  ];
  readonly placeholdersCount = 6;
  matchesCount = 0;


  constructor(private matchService: MatchService) {}

  ngOnInit() {
    this.matchService.getMatches().subscribe(
      (data) => {
        this.matches = this.fillPlaceholders(data);
        this.updateMatchCount();
      },
      (error) => {
        console.error('Failed to fetch matches', error);
        this.matches = this.createPlaceholders();
        this.updateMatchCount();
      }
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
