import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Playlist } from 'sharedModels/common';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlist: Playlist;

  constructor(private http: HttpClient) { }

  public downloadYotubePlaylist(url: string): Observable<any> {
    return this.http.post(`${environment.serverUrl}/download-playlist`, { url });
  }

  public sendPlaylist(url: string, playlist: string): Observable<any> {
    return this.http.post(`${environment.serverUrl}/songs`, { playlist: playlist, url: url });
  }

  public getPlaylist(): Observable<Playlist> {
    return this.http.get<Playlist>(`${environment.serverUrl}/playlist`);
  }

  public setLocalPlaylist(playlist: Playlist): void {
    if (playlist.albumName && playlist.playlist) {
      this.playlist = playlist;
    }
  }

  public getLocalPlaylist(): Observable<Playlist> {
    const localPlaylist = JSON.parse(localStorage.getItem('playlist'));
    if (!this.playlist) {
      this.playlist = localPlaylist;
    }
    return of({ ...this.playlist });
  }
}
