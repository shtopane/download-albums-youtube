import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Playlist } from 'shared-models/common';
import { environment } from 'src/environments/environment';
import { PlaylistItemInfo } from '../shared/components/list-playlist/playlist-item/playlist-item.component';
import { LoaderService } from '../shared/services/loader/loader.service';
import { PlaylistService } from '../shared/services/playlist/playlist.service';

@Component({
  selector: 'app-download-single-song',
  templateUrl: './download-single-song.component.html',
  styleUrls: ['./download-single-song.component.scss']
})
export class DownloadSingleSongComponent implements OnInit {
  public downloadSingleSongForm: FormGroup;
  public playlist: Playlist;
  public get url(): AbstractControl {
    return this.downloadSingleSongForm ? this.downloadSingleSongForm.get('url') : undefined;
  }

  constructor(
    private loaderService: LoaderService,
    private playlistService: PlaylistService
  ) { }

  ngOnInit() {
    this.downloadSingleSongForm = new FormGroup({ url: new FormControl('', Validators.required) });
  }

  public onSubmit(): void {
    if (this.downloadSingleSongForm.valid) {
      this.loaderService.showLoader();

      this.playlistService.downloadSingleSong(this.url.value).subscribe((res: {
        songName: string;
        success: boolean;
        thumbnail: string;
        thumbnail_url: string;
      }) => {
        this.loaderService.hideLoader();
        console.log('RES', res);
        this.playlist = {
          albumName: res.songName,
          playlist: [
            {
              name: res.songName,
              thumbnail: res.thumbnail
            }
          ]
        }
      },
        error => {
          this.loaderService.hideLoader();
          console.log('download single song submit error', error);
        }
      );
    }
  }

  public onListenClicked():void{
    
  }

  public onDownloadZipClicked():void{
    
  }

  public onDownloadClicked(songInfo: PlaylistItemInfo): void {
    const url = `${environment.serverUrl}/download-single?&songName=${encodeURIComponent(songInfo.playlistItemName)}&format=mp4`;

    window.open(url, '_blank');
  }

}
