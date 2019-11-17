import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private shownSub = new Subject<boolean>();

  constructor() { }

  public showLoader(): void {
    this.shownSub.next(true);
  }

  public hideLoader(): void {
    this.shownSub.next(false);
  }

  public getShown(): Observable<boolean> {
    return this.shownSub.asObservable();
  }
}
