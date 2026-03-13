// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/v1'
      : 'https://budget-planning-be.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  login(login: { user_name: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, {
        user_name: login.user_name,
        password: login.password,
      })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.data.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  }
}
