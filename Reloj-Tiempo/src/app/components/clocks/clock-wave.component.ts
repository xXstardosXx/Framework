import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'clock-wave',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="clock wave-clock">
    <div class="wave-container">
      <div class="wave hours-wave" [style.height]="(getHours() / 24 * 100) + '%'">
        <div class="wave-label">H: {{ getHours() }}</div>
      </div>
      <div class="wave minutes-wave" [style.height]="(getMinutes() / 60 * 100) + '%'">
        <div class="wave-label">M: {{ getMinutes() }}</div>
      </div>
      <div class="wave seconds-wave" [style.height]="(getSeconds() / 60 * 100) + '%'">
        <div class="wave-label">S: {{ getSeconds() }}</div>
      </div>
    </div>
    <div class="wave-animation"></div>
  </div>
  `,
  styleUrls: ['./styles/clock-wave.component.css']
})
export class ClockWaveComponent implements OnChanges{
  @Input() time: Date = new Date();

  ngOnChanges(): void {}

  getHours(){ return this.time ? this.time.getHours() : new Date().getHours(); }
  getMinutes(){ return this.time ? this.time.getMinutes() : new Date().getMinutes(); }
  getSeconds(){ return this.time ? this.time.getSeconds() : new Date().getSeconds(); }
}
