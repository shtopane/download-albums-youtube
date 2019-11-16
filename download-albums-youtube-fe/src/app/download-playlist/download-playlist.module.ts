import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadPlaylistRoutingModule } from './download-playlist-routing.module';
import { DownloadPlaylistComponent } from './containers/download-playlist/download-playlist.component';

@NgModule({
    declarations: [DownloadPlaylistComponent],
    imports: [
        CommonModule,
        DownloadPlaylistRoutingModule
    ]
})
export class DownloadPlaylistModule { }
