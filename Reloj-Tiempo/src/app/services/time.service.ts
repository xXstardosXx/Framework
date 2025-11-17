import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimeService {
  private offsetMs = 0;
  private timerId: any = null;
  public time$ = new BehaviorSubject<Date>(new Date());

  constructor() {
    this.start();
  }

  private start() {
    if (this.timerId) return;
    this.timerId = setInterval(() => {
      this.time$.next(new Date(Date.now() + this.offsetMs));
    }, 250);
  }

  setOffsetSeconds(seconds: number) {
    this.offsetMs = Math.round(seconds * 1000);
    this.time$.next(new Date(Date.now() + this.offsetMs));
  }

  getNowWithOffset(): Date {
    return new Date(Date.now() + this.offsetMs);
  }
}
