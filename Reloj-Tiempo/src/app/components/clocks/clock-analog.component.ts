import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'clock-analog',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="analog">
    <div class="dial">
      <div class="hand hour" [style.transform]="hourStyle"></div>
      <div class="hand min" [style.transform]="minStyle"></div>
      <div class="hand sec" [style.transform]="secStyle"></div>
      <div class="center"></div>
    </div>
  </div>
  `,
  styleUrls: ['./styles/clock-analog.component.css']
})
export class ClockAnalogComponent implements OnChanges {
  @Input() time: Date = new Date();
  hourStyle = '';
  minStyle = '';
  secStyle = '';

  ngOnChanges() { this.update(); }

  private update(){
    const h = this.time.getHours() % 12;
    const m = this.time.getMinutes();
    const s = this.time.getSeconds();
    const hourDeg = (h + m/60) * 30;
    const minDeg = (m + s/60) * 6;
    const secDeg = s * 6;
    this.hourStyle = `rotate(${hourDeg}deg)`;
    this.minStyle = `rotate(${minDeg}deg)`;
    this.secStyle = `rotate(${secDeg}deg)`;
  }
}
