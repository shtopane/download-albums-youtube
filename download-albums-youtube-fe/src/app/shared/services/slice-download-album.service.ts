import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Tracklist } from '../../playlist/models/tracklist';

@Injectable({
  providedIn: 'root'
})
export class SliceDownloadAlbumService {
  private tracklist: Tracklist;

  constructor(private http: HttpClient) { }

  public sliceDownloadAlbum(url: string, tracklist: string): Observable<any> {
    return this.http.post(`${environment.serverUrl}/songs`, { playlist: tracklist, url: url });
  }

  public getPlaylist(): Observable<Tracklist> {
    return this.http.get<Tracklist>(`${environment.serverUrl}/playlist`);
  }

  public setTracklist(tracklist: Tracklist): void {
    console.log('tracklist in service', tracklist);
    if (tracklist.albumName && tracklist.playlist) {
      this.tracklist = tracklist;
    }
  }

  public getTracklist(): Observable<Tracklist> {
    return of({ ...this.tracklist });
  }
}
