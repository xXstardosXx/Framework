import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'clock-particles',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="particles">
    <div class="big">{{ hh }}:{{ mm }}:{{ ss }}</div>
    <div class="note">Partículas — cada segundo cambia el patrón</div>
  </div>
  `,
  styleUrls: ['./styles/clock-particles.component.css']
})
export class ClockParticlesComponent implements OnChanges{
  @Input() time: Date = new Date(); hh='00';mm='00';ss='00';
  ngOnChanges(){
    this.hh = String(this.time.getHours()).padStart(2,'0');
    this.mm = String(this.time.getMinutes()).padStart(2,'0');
    this.ss = String(this.time.getSeconds()).padStart(2,'0');
  }
}
