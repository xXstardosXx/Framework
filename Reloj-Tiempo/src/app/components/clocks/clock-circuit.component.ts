import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CircuitNode { x: number; y: number; active: boolean; delay: number }

@Component({
  selector: 'clock-circuit',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="clock circuit-clock">
    <div class="circuit-board">
      <div class="circuit-path hours-circuit">
        <div class="node" 
             *ngFor="let node of getCircuitNodes(getHours(), 24)"
             [style.left]="node.x + '%'"
             [style.top]="node.y + '%'"
             [class.active]="node.active">
          <div class="pulse" [style.animation-delay]="node.delay + 's'"></div>
        </div>
        <svg class="circuit-line" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path [attr.d]="getCircuitPath(getHours())" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-dasharray="2,2"/>
        </svg>
      </div>

      <div class="circuit-path minutes-circuit">
        <div class="node" 
             *ngFor="let node of getCircuitNodes(getMinutes(), 60)"
             [style.left]="node.x + '%'"
             [style.top]="node.y + '%'"
             [class.active]="node.active">
          <div class="pulse" [style.animation-delay]="node.delay + 's'"></div>
        </div>
        <svg class="circuit-line" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path [attr.d]="getCircuitPath(getMinutes())" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-dasharray="2,2"/>
        </svg>
      </div>

      <div class="circuit-path seconds-circuit">
        <div class="node" 
             *ngFor="let node of getCircuitNodes(getSeconds(), 60)"
             [style.left]="node.x + '%'"
             [style.top]="node.y + '%'"
             [class.active]="node.active">
          <div class="pulse" [style.animation-delay]="node.delay + 's'"></div>
        </div>
        <svg class="circuit-line" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path [attr.d]="getCircuitPath(getSeconds())" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-dasharray="2,2"/>
        </svg>
      </div>
    </div>
    
    <div class="circuit-labels">
      <span class="hours-chip">{{ getHours() }}H</span>
      <span class="minutes-chip">{{ getMinutes() }}M</span>
      <span class="seconds-chip">{{ getSeconds() }}S</span>
    </div>
  </div>
  `,
  styleUrls: ['./styles/clock-circuit.component.css']
})
export class ClockCircuitComponent implements OnChanges {
  @Input() time: Date = new Date();

  ngOnChanges(): void {}

  getHours(): number { return this.time ? this.time.getHours() : new Date().getHours(); }
  getMinutes(): number { return this.time ? this.time.getMinutes() : new Date().getMinutes(); }
  getSeconds(): number { return this.time ? this.time.getSeconds() : new Date().getSeconds(); }

  getCircuitNodes(current: number, total: number): CircuitNode[] {
    const nodes: CircuitNode[] = [];
    const radius = 40; // percent radius inside 0..100 box
    for (let i = 0; i < total; i++) {
      const angle = (i / total) * Math.PI * 2;
      const x = 50 + Math.cos(angle) * radius;
      const y = 50 + Math.sin(angle) * radius;
      nodes.push({ x, y, active: i < current, delay: Math.random() * 1.6 });
    }
    return nodes;
  }

  getCircuitPath(current: number): string {
    const total = Math.max(current, 3);
    const nodes = this.getCircuitNodes(current, total).filter(n => n.active);
    if (!nodes.length) return '';
    const coords = nodes.map(n => `${n.x.toFixed(2)} ${n.y.toFixed(2)}`);
    return 'M ' + coords.join(' L ');
  }
}
