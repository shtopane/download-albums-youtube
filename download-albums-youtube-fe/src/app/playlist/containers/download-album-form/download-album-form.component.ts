import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SliceDownloadAlbumService } from '../../services/slice-download-album.service';

@Component({
  selector: 'app-download-album-form',
  templateUrl: './download-album-form.component.html',
  styleUrls: ['./download-album-form.component.scss']
})
export class DownloadAlbumFormComponent implements OnInit {
  public downloadAlbumForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sliceDownloadAlbumService: SliceDownloadAlbumService
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
      this.sliceDownloadAlbumService.sliceDownloadAlbum(this.url, this.tracklist).subscribe(res => {
        console.log('response from server', res)
        if (res.success) {
          this.sliceDownloadAlbumService.getPlaylist().subscribe(res => console.log('playlist?', res));
        }
      });
    }
  }

}
