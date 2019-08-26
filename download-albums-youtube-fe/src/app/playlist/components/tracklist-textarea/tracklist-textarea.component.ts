import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tracklist-textarea',
  templateUrl: './tracklist-textarea.component.html',
  styleUrls: ['./tracklist-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TracklistTextareaComponent implements OnInit {
  @Input() controlName: string;
  @Input() parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
