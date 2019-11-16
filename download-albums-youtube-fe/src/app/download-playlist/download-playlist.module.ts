import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadPlaylistRoutingModule } from './download-playlist-routing.module';
import { DownloadPlaylistComponent } from './containers/download-playlist/download-playlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [DownloadPlaylistComponent],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        CommonModule,
        DownloadPlaylistRoutingModule
    ]
})
export class DownloadPlaylistModule { }
