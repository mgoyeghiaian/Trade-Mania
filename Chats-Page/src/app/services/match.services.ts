// src/app/services/match.service.ts
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private url = environment.backendUrl;
  private socket = io(this.url, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000
  });

  private matchesSubject = new BehaviorSubject<any[]>([]);
  public matches = this.matchesSubject.asObservable();

  constructor(private http: HttpClient, private zone: NgZone) {
    this.initializeWebSocketListeners();
  }

  getMatches(): Observable<any> {
    return this.http.get<any>(`${this.url}/matches`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private initializeWebSocketListeners(): void {
    this.socket.on('connect', () => console.log('Connected to Socket.IO server'));
    this.socket.on('connect_error', (error) => console.error('Connection error:', error));

    this.socket.on('matches-updated', (data: any[]) => {
      this.matchesSubject.next(data);
      console.log('Received updated matches data:', data);
    });

    this.socket.on('new-match', (newMatch: any) => {
      this.updateMatches(newMatch);
      console.log('New match received:', newMatch);
    });

    this.socket.on('online-status-changed', (statusUpdate: { userId: string, isOnline: boolean }) => {
      console.log("Online status event received:", statusUpdate);
      this.zone.run(() => {
        this.updateOnlineStatus(statusUpdate);
      });
    });
  }

  private updateMatches(newMatch: any): void {
    const currentMatches = this.matchesSubject.value;
    this.matchesSubject.next([...currentMatches, newMatch]);
  }

  private updateOnlineStatus(statusUpdate: { userId: string, isOnline: boolean }): void {
    const updatedMatches = this.matchesSubject.value.map(match => {
      if (match._id === statusUpdate.userId) {
        return { ...match, isOnline: statusUpdate.isOnline };
      }
      return match;
    });
    this.matchesSubject.next(updatedMatches);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
