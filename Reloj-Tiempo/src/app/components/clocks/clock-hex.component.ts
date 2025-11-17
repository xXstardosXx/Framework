import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

function pad(n:number){return String(n).padStart(2,'0')}

@Component({
  selector: 'clock-hex',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hex" [style.background]="bg">
      <div class="time">{{time.getHours()}}:{{time.getMinutes()}}:{{time.getSeconds()}}</div>
      <div class="hexval">{{hex}}</div>
    </div>
  `,
  styleUrls: ['./styles/clock-hex.component.css']
})
export class ClockHexComponent implements OnChanges{
  @Input() time: Date = new Date();
  bg = '#000'; hex = '#000000';
  ngOnChanges(){
    const r = pad(this.time.getHours());
    const g = pad(this.time.getMinutes());
    const b = pad(this.time.getSeconds());
    // create a hex-like color from time components: keep last 2 digits each
    const hr = Number(r)%256; const mg = Number(g)%256; const sb = Number(b)%256;
    this.hex = `#${hr.toString(16).padStart(2,'0')}${mg.toString(16).padStart(2,'0')}${sb.toString(16).padStart(2,'0')}`;
    this.bg = this.hex;
  }
}
