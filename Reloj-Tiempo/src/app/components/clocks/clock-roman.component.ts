import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

function toRoman(num:number){
  const map: [number,string][] = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let res='';
  for(const [val,sym] of map){while(num>=val){res+=sym;num-=val}}return res || '0';
}

@Component({
  selector: 'clock-roman',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="roman"><div class="big">{{ romanHour }}</div><div class="small">{{ mm }}:{{ ss }}</div></div>`,
  styleUrls: ['./styles/clock-roman.component.css']
})
export class ClockRomanComponent implements OnChanges{
  @Input() time: Date = new Date();
  romanHour=''; mm='00'; ss='00';
  ngOnChanges(){
    const h = this.time.getHours()%12 || 12;
    this.romanHour = toRoman(h);
    this.mm = String(this.time.getMinutes()).padStart(2,'0');
    this.ss = String(this.time.getSeconds()).padStart(2,'0');
  }
}
