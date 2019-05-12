import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  public message$: Observable<string>;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.message$ = this.alertService.getMessage();
  }

}
