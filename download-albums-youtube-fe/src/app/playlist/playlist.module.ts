import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PlaylistRoutingModule } from './playlist-routing.module';
import { PlaylistFormComponent } from './containers/playlist-form/playlist-form.component';
import { HowToUseComponent } from './components/how-to-use/how-to-use.component';
import { TracklistTextareaComponent } from './components/tracklist-textarea/tracklist-textarea.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PlaylistFormComponent, HowToUseComponent, TracklistTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PlaylistRoutingModule
  ]
})
export class PlaylistModule { }
