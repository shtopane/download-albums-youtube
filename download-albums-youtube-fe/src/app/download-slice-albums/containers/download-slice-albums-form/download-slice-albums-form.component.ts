import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlaylistResponse, BaseResponse } from 'sharedModels/common';

import { PlaylistService } from 'src/app/shared/services/playlist/playlist.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Component({
  selector: 'app-download-slice-albums-form',
  templateUrl: './download-slice-albums-form.component.html',
  styleUrls: ['./download-slice-albums-form.component.scss']
})
export class DownloadSliceAlbumsFormComponent implements OnInit {
  public downloadAlbumForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private router: Router,
    private loaderService: LoaderService,
    private alertService: AlertService
  ) { }

  public get url(): string {
    return this.downloadAlbumForm.get('url').value;
  }

  public get playlist(): string {
    return this.downloadAlbumForm.get('playlist').value;
  }

  public get disabled(): boolean {
    return this.downloadAlbumForm.invalid;
  }

  public ngOnInit(): void {
    this.downloadAlbumForm = this.fb.group({
      url: ['', Validators.required],
      playlist: [``, Validators.required]
    });
  }

  public onSubmit(): void {
    if (this.downloadAlbumForm.valid) {
      this.loaderService.showLoader();
      /** Do something */
      this.playlistService.sendPlaylist(this.url, this.playlist)
        .subscribe((res: BaseResponse) => {
          this.loaderService.hideLoader();
          if (res.success) {
            this.playlistService.getPlaylist()
              .subscribe((res: PlaylistResponse) => {
                this.playlistService.setLocalPlaylist({ albumName: res.albumName, playlist: res.playlist });
                this.router.navigate(['/album']);
              });
          }
        },
          (error) => {
            console.log('in error clause of observable', error)
            this.alertService.setMessage(error.error.errorMessage);
            this.loaderService.hideLoader();
          }
        );
    }
  }
}

