import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PlaylistService } from 'src/app/shared/services/playlist/playlist.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Component({
  selector: 'app-download-playlist',
  templateUrl: './download-playlist.component.html',
  styleUrls: ['./download-playlist.component.scss']
})
export class DownloadPlaylistComponent implements OnInit {
  public downloadPlaylistForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private loaderService: LoaderService
  ) { }

  public get url() {
    return this.downloadPlaylistForm ? this.downloadPlaylistForm.get('url') : undefined;
  }

  ngOnInit() {
    this.downloadPlaylistForm = this.fb.group({
      url: ['', Validators.required]
    })
  }

  public onSubmit() {
    if (this.downloadPlaylistForm.valid) {
      this.loaderService.showLoader();

      this.playlistService.downloadYotubePlaylist(this.url.value).subscribe(res => {
        this.loaderService.hideLoader();
        console.log('res from server', res)
      },
        error => {
          this.loaderService.hideLoader();
          console.log('download playlist submit error', error);
        }
      );
    }

  }

}
