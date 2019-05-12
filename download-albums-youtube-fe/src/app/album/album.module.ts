import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './containers/album/album.component';
import { AlbumOutletComponent } from './containers/album-outlet/album-outlet.component';

@NgModule({
  declarations: [AlbumComponent, AlbumOutletComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule
  ]
})
export class AlbumModule { }
