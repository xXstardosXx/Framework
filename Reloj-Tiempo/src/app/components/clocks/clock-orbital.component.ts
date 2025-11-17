import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle { angle: number }

@Component({
  selector: 'clock-orbital',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="clock orbital-clock">
    <div class="orbital-system">
      <div class="orbit hours-orbit" [style.animation-duration]="24 - getHours() + 's'">
        <div *ngFor="let p of getHourParticles()" class="particle hour-particle" [style.transform]="'rotate(' + p.angle + 'deg)'">
        </div>
      </div>

      <div class="orbit minutes-orbit" [style.animation-duration]="60 - getMinutes() + 's'">
        <div *ngFor="let p of getMinuteParticles()" class="particle minute-particle" [style.transform]="'rotate(' + p.angle + 'deg)'">
        </div>
      </div>

      <div class="orbit seconds-orbit" [style.animation-duration]="60 - getSeconds() + 's'">
        <div *ngFor="let p of getSecondParticles()" class="particle second-particle" [style.transform]="'rotate(' + p.angle + 'deg)'">
        </div>
      </div>

      <div class="center-dot"></div>
    </div>
    <div class="orbital-labels">
      <span class="hours-label">{{ getHours() }}h</span>
      <span class="minutes-label">{{ getMinutes() }}m</span>
      <span class="seconds-label">{{ getSeconds() }}s</span>
    </div>
  </div>
  `,
  styleUrls: ['./styles/clock-orbital.component.css']
})
export class ClockOrbitalComponent implements OnChanges{
  @Input() time: Date = new Date();

  ngOnChanges(): void {}

  private makeParticles(count: number, offsetDeg = 0): Particle[]{
    return Array.from({length: count}, (_, i) => ({ angle: (i * (360 / count) + offsetDeg) % 360 }));
  }

  getHours(){ return this.time ? this.time.getHours() : new Date().getHours(); }
  getMinutes(){ return this.time ? this.time.getMinutes() : new Date().getMinutes(); }
  getSeconds(){ return this.time ? this.time.getSeconds() : new Date().getSeconds(); }

  getHourParticles(): Particle[]{
    const offset = (this.getHours() / 24) * 360;
    return this.makeParticles(12, offset);
  }

  getMinuteParticles(): Particle[]{
    const offset = (this.getMinutes() / 60) * 360;
    return this.makeParticles(18, offset);
  }

  getSecondParticles(): Particle[]{
    const offset = (this.getSeconds() / 60) * 360;
    return this.makeParticles(24, offset);
  }
}
