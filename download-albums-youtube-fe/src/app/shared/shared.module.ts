import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from './components/alert/alert.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UrlInputComponent } from './components/url-input/url-input.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { TracklistItemComponent } from './components/tracklist-item/tracklist-item.component';
import { ListPlaylistComponent } from './components/list-playlist/list-playlist.component';

const components = [
  AlertComponent,
  LoaderComponent,
  UrlInputComponent,
  NavigationComponent,
  TracklistItemComponent,
  ListPlaylistComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [components]
})
export class SharedModule { }
