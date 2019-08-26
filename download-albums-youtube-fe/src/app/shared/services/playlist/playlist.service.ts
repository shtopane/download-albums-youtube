import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Tracklist } from 'src/app/playlist/models/tracklist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private tracklist: Tracklist;

  constructor(private http: HttpClient) { }

  public sendPlaylist(url: string, tracklist: string): Observable<any> {
    return this.http.post(`${environment.serverUrl}/songs`, { playlist: tracklist, url: url });
  }

  public getPlaylist(): Observable<Tracklist> {
    return this.http.get<Tracklist>(`${environment.serverUrl}/playlist`);
  }

  public setTracklist(tracklist: Tracklist): void {
    if (tracklist.albumName && tracklist.playlist) {
      this.tracklist = tracklist;
    }
  }

  public getTracklist(): Observable<Tracklist> {
    const localTracklist = JSON.parse(localStorage.getItem('playlist'));
    if (!this.tracklist) {
      this.tracklist = localTracklist;
    }
    return of({ ...this.tracklist });
  }
}
