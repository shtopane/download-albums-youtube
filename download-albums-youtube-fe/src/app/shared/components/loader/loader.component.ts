import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public shown$: Observable<boolean>;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.shown$ = this.loaderService.getShown();
  }

}
