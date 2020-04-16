import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';


import { environment } from 'src/environments/environment';
import { Playlist } from '../../../../../shared-models/common';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlist: Playlist;

  constructor(private http: HttpClient) { }

  public downloadYotubePlaylist(url: string): Observable<any> {
    //`${environment.serverUrl}/download-playlist`
    return this.http.post(`/api/download-playlist`, { url });
  }

  public sendPlaylist(url: string, playlist: string): Observable<any> {
    // `${environment.serverUrl}/songs`
    return this.http.post(`/api/songs`, { playlist, url });
  }

  public getPlaylist(): Observable<Playlist> {
    // `${environment.serverUrl}/playlist`
    return this.http.get<Playlist>(`/api/playlist`);
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
