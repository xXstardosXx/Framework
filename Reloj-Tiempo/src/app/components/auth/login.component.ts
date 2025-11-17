import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="auth">
    <h2>Iniciar sesión</h2>
    <form (ngSubmit)="submit()">
      <label>Usuario<br><input [(ngModel)]="username" name="u" required /></label>
      <label>Contraseña<br><input [(ngModel)]="password" type="password" name="p" required /></label>
      <div class="actions">
        <button type="submit">Entrar</button>
        <button type="button" [routerLink]="['/register']" class="btn-back">Registrarse</button>
      </div>
      <div *ngIf="error" class="error">{{ error }}</div>
    </form>
  </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    const ok = this.auth.login(this.username.trim(), this.password);
    if (!ok) { this.error = 'Credenciales inválidas'; return; }
    this.router.navigate(['/lobby']);
  }
}
