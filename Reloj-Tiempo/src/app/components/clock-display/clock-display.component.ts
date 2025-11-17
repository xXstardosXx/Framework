import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TimeService } from '../../services/time.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

import { ClockAnalogComponent } from '../clocks/clock-analog.component';
import { ClockBarComponent } from '../clocks/clock-bar.component';
import { ClockBinaryComponent } from '../clocks/clock-binary.component';
import { ClockHexComponent } from '../clocks/clock-hex.component';
import { ClockRomanComponent } from '../clocks/clock-roman.component';
import { ClockParticlesComponent } from '../clocks/clock-particles.component';
import { ClockWaveComponent } from '../clocks/clock-wave.component';
import { ClockGlassComponent } from '../clocks/clock-glass.component';
import { ClockOrbitalComponent } from '../clocks/clock-orbital.component';
import { ClockCircuitComponent } from '../clocks/clock-circuit.component';

@Component({
  selector: 'app-clock-display',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,
    ClockAnalogComponent, ClockBarComponent, ClockBinaryComponent, ClockHexComponent, ClockRomanComponent, ClockParticlesComponent, ClockWaveComponent, ClockGlassComponent, ClockOrbitalComponent, ClockCircuitComponent,
  ],
  template: `
  <div class="app-shell">
    <header>
      <h1>Visualizadores del Tiempo</h1>
      <div class="controls">
        <label>Visualizador
          <select [(ngModel)]="selected">
            <option *ngFor="let v of viewers" [value]="v.key">{{v.label}}</option>
          </select>
        </label>
        <label class="offset-control">Offset (segundos)
          <div class="offset-row" (wheel)="onOffsetWheel($event)">
            <button type="button" class="tiny" (click)="changeOffset(-600)">-10m</button>
            <button type="button" class="tiny" (click)="changeOffset(-60)">-1m</button>
            <input type="range" min="-86400" max="86400" step="1" [(ngModel)]="offsetSec" (input)="updateOffset()" />
            <button type="button" class="tiny" (click)="changeOffset(60)">+1m</button>
            <button type="button" class="tiny" (click)="changeOffset(600)">+10m</button>
            <input class="offset-number" type="number" [value]="offsetSec" (change)="onOffsetNumber($event)" />
            <button type="button" class="tiny" (click)="resetOffset()">Ahora</button>
            <span class="offset-label">{{ offsetSec }}s</span>
          </div>
        </label>
        <div class="auth-area">
          <span *ngIf="!auth.isAuthenticated()"><a routerLink="/login">Entrar</a> · <a routerLink="/register">Registrarse</a></span>
        </div>
      </div>
      <div class="header-actions">
        <ng-container *ngIf="auth.isAuthenticated()">
          <span class="greeting">Bienvenido, {{ auth.getUser() }}</span>
          <button class="btn-logout" (click)="auth.logout()">Salir</button>
        </ng-container>
      </div>
    </header>

    <section class="viewer">
      <clock-analog *ngIf="selected==='analog'" [time]="time"></clock-analog>
      <clock-bar *ngIf="selected==='bar'" [time]="time"></clock-bar>
      <clock-binary *ngIf="selected==='binary'" [time]="time"></clock-binary>
      <clock-hex *ngIf="selected==='hex'" [time]="time"></clock-hex>
      <clock-roman *ngIf="selected==='roman'" [time]="time"></clock-roman>
      <clock-wave *ngIf="selected==='wave'" [time]="time"></clock-wave>
      <clock-glass *ngIf="selected==='glass'" [time]="time"></clock-glass>
      <clock-orbital *ngIf="selected==='orbital'" [time]="time"></clock-orbital>
      <clock-circuit *ngIf="selected==='circuit'" [time]="time"></clock-circuit>
      <clock-particles *ngIf="selected==='particles'" [time]="time"></clock-particles>
    </section>
  </div>
  `,
  styleUrls: ['./clock-display.component.css']
})
export class ClockDisplayComponent implements OnDestroy {
  viewers = [
    { key: 'analog', label: 'Analógico (manecillas)' },
    { key: 'bar', label: 'Barras (H/M/S)' },
    { key: 'binary', label: 'Binario' },
    { key: 'hex', label: 'Hexágonos/Colores' },
    { key: 'roman', label: 'Romanos (hora)' },
    { key: 'wave', label: 'Wave (olas)' },
    { key: 'glass', label: 'Cristal (glassmorphism)' },
    { key: 'circuit', label: 'Circuito (PCB)' },
    { key: 'orbital', label: 'Orbital (partículas)' },
    { key: 'particles', label: 'Particles (visual)' }
  ];
  selected = 'analog';
  offsetSec = 0;
  time = new Date();
  private sub: Subscription;

  constructor(public ts: TimeService, public auth: AuthService) {
    this.sub = this.ts.time$.subscribe(t => this.time = t);
  }

  updateOffset() { this.ts.setOffsetSeconds(this.offsetSec); }

  changeOffset(delta: number) {
    // allow up to +/- 24 hours (86400 seconds)
    this.offsetSec = Math.max(-86400, Math.min(86400, this.offsetSec + delta));
    this.updateOffset();
  }

  onOffsetNumber(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    const n = parseInt(v, 10);
    if (!Number.isNaN(n)) {
      this.offsetSec = Math.max(-86400, Math.min(86400, n));
      this.updateOffset();
    }
  }

  onOffsetWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    this.changeOffset(delta);
  }

  resetOffset() {
    this.offsetSec = 0;
    this.updateOffset();
  }

  ngOnDestroy() { this.sub.unsubscribe(); }
}
