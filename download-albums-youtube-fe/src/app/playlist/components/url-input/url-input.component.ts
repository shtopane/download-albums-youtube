import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrlInputComponent implements OnInit {
  @Input() controlName: string;
  @Input() parent: FormGroup;
  @Input() disabled: boolean;
  @Output() send: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
