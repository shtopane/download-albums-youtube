import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, debounce, tap } from 'rxjs/operators';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  public message$: Observable<string>;
  public messageActiveState: boolean;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.message$ = this.alertService.getMessage();

    this.message$.pipe(
      tap(() => this.messageActiveState = true)
    );
  }

  onClose() {
    this.alertService.setMessage(null);
  }

}
