import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaylistService } from '../../../shared/services/playlist.service';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { Tracklist } from '../../models/tracklist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.scss']
})
export class PlaylistFormComponent implements OnInit {
  public downloadAlbumForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private router: Router
  ) { }

  public get url(): string {
    return this.downloadAlbumForm.get('url').value;
  }

  public get tracklist(): string {
    return this.downloadAlbumForm.get('tracklist').value;
  }

  public get disabled(): boolean {
    return this.downloadAlbumForm.invalid;
  }

  public ngOnInit(): void {
    this.downloadAlbumForm = this.fb.group({
      url: ['https://www.youtube.com/watch?v=pQCfnMeEv3w', Validators.required],
      tracklist: [`
      1. First part 0:00 
      2. Second part  1:30 
      3. Third part 2:15
      `,
        Validators.required]
    });
  }

  public onSubmit(): void {
    console.log('submitted!', this.downloadAlbumForm);

    if (this.downloadAlbumForm.valid) {
      /** Do something */
      this.playlistService.sendPlaylist(this.url, this.tracklist).subscribe((res: BaseResponse) => {
        console.log('response from server', res)
        if (res.success) {
          this.playlistService.getPlaylist()
            .subscribe((res: Tracklist & BaseResponse) => {
              this.playlistService.setTracklist({ albumName: res.albumName, playlist: res.playlist });
              console.log('playlist?', res)
              this.router.navigate(['/album']);
            });
        }
      });
    }
  }

}
