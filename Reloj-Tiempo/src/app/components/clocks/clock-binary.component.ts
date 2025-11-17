import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

function toBin(n: number, len=6){ return n.toString(2).padStart(len,'0'); }

@Component({
  selector: 'clock-binary',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="binary">
    <div><strong>H</strong> <span *ngFor="let c of hb" [class.on]="c==='1'">{{c}}</span></div>
    <div><strong>M</strong> <span *ngFor="let c of mb" [class.on]="c==='1'">{{c}}</span></div>
    <div><strong>S</strong> <span *ngFor="let c of sb" [class.on]="c==='1'">{{c}}</span></div>
  </div>
  `,
  styleUrls: ['./styles/clock-binary.component.css']
})
export class ClockBinaryComponent implements OnChanges{
  @Input() time: Date = new Date();
  hb: string[] = [];
  mb: string[] = [];
  sb: string[] = [];
  ngOnChanges(){
    this.hb = toBin(this.time.getHours(),6).split('');
    this.mb = toBin(this.time.getMinutes(),6).split('');
    this.sb = toBin(this.time.getSeconds(),6).split('');
  }
}
