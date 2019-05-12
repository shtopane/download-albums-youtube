import { Component, OnInit } from '@angular/core';
import { SliceDownloadAlbumService } from 'src/app/playlist/services/slice-download-album.service';
import { Tracklist } from 'src/app/playlist/models/tracklist';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  public tracklist$: Observable<Tracklist>;

  constructor(private sliceDownloadAlbumService: SliceDownloadAlbumService) { }

  ngOnInit() {
    const t: Tracklist = {
      playlist: [
        {
          "songBegin": "0:00",
          "songName": "First part",
          "tumbnail": "https://i.ytimg.com/vi/pQCfnMeEv3w/default.jpg"
        },
        {
          "songBegin": "1:30",
          "songName": "Second part",
          "tumbnail": "https://i.ytimg.com/vi/pQCfnMeEv3w/default.jpg"
        },
        {
          "songBegin": "2:15",
          "songName": "Third part",
          "tumbnail": "https://i.ytimg.com/vi/pQCfnMeEv3w/default.jpg"
        }
      ],
      albumName: "The Underground Youth - Alice (Official Video)",
    }
    this.tracklist$ = of(t); // this.sliceDownloadAlbumService.getTracklist();
  }

}
