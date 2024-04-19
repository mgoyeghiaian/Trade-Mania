import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor() {}

  getMatches(): Observable<any[]> {
    const dummyMatches = [
      {
        name: 'Alice',
        profilePicture: 'assets/match1.jpg',
        isOnline: true
      },
      {
        name: 'Lucy',
        profilePicture: 'assets/match2.jpg',
        isOnline: false
      },
      {
        name: 'Mary',
        profilePicture: 'assets/match3.jpg',
        isOnline: true
      }
    ];
    return of(dummyMatches).pipe(delay(1000));
  }
}
