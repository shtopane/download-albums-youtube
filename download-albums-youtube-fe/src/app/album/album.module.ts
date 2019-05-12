import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './containers/album/album.component';
import { AlbumOutletComponent } from './containers/album-outlet/album-outlet.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AlbumComponent, AlbumOutletComponent],
  imports: [
    CommonModule,
    SharedModule,
    AlbumRoutingModule
  ]
})
export class AlbumModule { }
