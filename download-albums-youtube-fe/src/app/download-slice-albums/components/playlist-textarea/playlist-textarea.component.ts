import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-playlist-textarea',
  templateUrl: './playlist-textarea.component.html',
  styleUrls: ['./playlist-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistTextareaComponent implements OnInit {
  @Input() controlName: string;
  @Input() parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
