import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="auth">
    <h2>Registro</h2>
    <form (ngSubmit)="submit()">
      <label>Usuario<br><input [(ngModel)]="username" name="u" required /></label>
      <label>Contraseña<br><input [(ngModel)]="password" type="password" name="p" required minlength="6" /></label>
      <div class="actions">
        <button type="submit">Crear cuenta</button>
        <button type="button" class="btn-back" (click)="router.navigate(['/login'])">Volver</button>
      </div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div *ngIf="success" class="success">Cuenta creada. Ahora inicia sesión.</div>
    </form>
  </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  error: string | null = null;
  success = false;

  constructor(private auth: AuthService, public router: Router) {}

  submit() {
    this.error = null;
    const user = this.username.trim();
    if (!user) { this.error = 'Por favor ingresa un nombre de usuario'; return; }
    if (!this.password || this.password.length < 6) { this.error = 'La contraseña debe tener al menos 6 caracteres'; return; }

    const ok = this.auth.register(user, this.password);
    if (!ok) { this.error = 'El usuario ya existe'; return; }
    this.success = true;
    setTimeout(() => this.router.navigate(['/login']), 1200);
  }
}
