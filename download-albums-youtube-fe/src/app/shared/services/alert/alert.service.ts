import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSub: Subject<string> = new Subject<string>();

  constructor() { }

  public setMessage(message: string): void {
    this.alertSub.next(message);
  }

  public getMessage(): Observable<string> {
    return this.alertSub.asObservable();
  }
}
