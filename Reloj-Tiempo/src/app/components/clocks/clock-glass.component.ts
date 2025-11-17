import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'clock-glass',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="clock glass-clock">
    <div class="glass-panels">
      <div class="glass-panel hours-panel">
        <div class="glass-content">
          <div class="time-value">{{ getHours() }}</div>
          <div class="time-label">HORAS</div>
        </div>
      </div>
      <div class="glass-panel minutes-panel">
        <div class="glass-content">
          <div class="time-value">{{ getMinutes() }}</div>
          <div class="time-label">MINUTOS</div>
        </div>
      </div>
      <div class="glass-panel seconds-panel">
        <div class="glass-content">
          <div class="time-value">{{ getSeconds() }}</div>
          <div class="time-label">SEGUNDOS</div>
        </div>
      </div>
    </div>
    <div class="glass-reflections"></div>
  </div>
  `,
  styleUrls: ['./styles/clock-glass.component.css']
})
export class ClockGlassComponent implements OnChanges{
  @Input() time: Date = new Date();

  ngOnChanges(): void {}

  getHours(){ return this.time ? this.time.getHours() : new Date().getHours(); }
  getMinutes(){ return this.time ? this.time.getMinutes() : new Date().getMinutes(); }
  getSeconds(){ return this.time ? this.time.getSeconds() : new Date().getSeconds(); }
}
