import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Tracklist } from '../models/tracklist';

@Injectable({
  providedIn: 'root'
})
export class SliceDownloadAlbumService {

  constructor(private http: HttpClient) { }

  public sliceDownloadAlbum(url: string, tracklist: string): Observable<any> {
    return this.http.post(`${environment.serverUrl}/songs`, { playlist: tracklist, url: url });
  }

  public getPlaylist(): Observable<Tracklist> {
    return this.http.get<Tracklist>(`${environment.serverUrl}/playlist`);
  }
}
