import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ClockDisplayComponent } from './components/clock-display/clock-display.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';

export const routes: Routes = [
	// Root opens login. After successful login we navigate to /lobby
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'lobby', component: ClockDisplayComponent },
	{ path: '**', redirectTo: '' }
];
