import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User { username: string; password: string }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'rt_user';
  private usersKey = 'rt_users';

  constructor(private router: Router) {}

  register(username: string, password: string): boolean {
    const users = this._loadUsers();
    if (users.find(u => u.username === username)) return false;
    users.push({ username, password });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this._loadUsers();
    const u = users.find(x => x.username === username && x.password === password);
    if (!u) return false;
    localStorage.setItem(this.storageKey, JSON.stringify({ username }));
    return true;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  getUser(): string | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return null;
    try { return JSON.parse(raw).username; } catch { return null; }
  }

  private _loadUsers(): User[] {
    const raw = localStorage.getItem(this.usersKey);
    if (!raw) return [];
    try { return JSON.parse(raw) as User[] } catch { return [] }
  }
}
