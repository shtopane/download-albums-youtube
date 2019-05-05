import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PlaylistRoutingModule } from './playlist-routing.module';
import { DownloadAlbumFormComponent } from './containers/download-album-form/download-album-form.component';
import { HowToUseComponent } from './components/how-to-use/how-to-use.component';
import { UrlInputComponent } from './components/url-input/url-input.component';
import { TracklistTextareaComponent } from './components/tracklist-textarea/tracklist-textarea.component';

@NgModule({
  declarations: [DownloadAlbumFormComponent, HowToUseComponent, UrlInputComponent, TracklistTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlaylistRoutingModule
  ]
})
export class PlaylistModule { }
