import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'clock-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bars">
    <div class="bar"><div class="fill" [style.width.%]="hPct"></div><span>H {{h}}</span></div>
    <div class="bar"><div class="fill" [style.width.%]="mPct"></div><span>M {{m}}</span></div>
    <div class="bar"><div class="fill" [style.width.%]="sPct"></div><span>S {{s}}</span></div>
  </div>
  `,
  styleUrls: ['./styles/clock-bar.component.css']
})
export class ClockBarComponent implements OnChanges{
  @Input() time: Date = new Date();
  h=0; m=0; s=0; hPct=0; mPct=0; sPct=0;
  ngOnChanges(){
    this.h = this.time.getHours(); this.m = this.time.getMinutes(); this.s = this.time.getSeconds();
    this.hPct = (this.h%24)/24*100; this.mPct = this.m/60*100; this.sPct = this.s/60*100;
  }
}
