import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userLogged = new BehaviorSubject('Login')
  private tokenKey = 'authToken';

  constructor(private http: HttpClient,) {
    // Check if we have a stored token and decode username
    const storedToken = localStorage.getItem(this.tokenKey);
    if (storedToken) {
      const username = this.decodeToken(storedToken);
      if (username) {
        this.userLogged.next(username);
      }
    }
  }



login(email: string, password: string) {
  return this.http.post<any>(
    'http://127.0.0.1:8000/api/login/',
    {
      username: email,
      password: password
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  ).subscribe(response => {
    if (response.status === 'success') {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('refreshToken', response.refresh_token);
      localStorage.setItem('username', response.username);

      this.userLogged.next(response.username);
    }
  });
}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userLogged.next('Login');
  }

  private decodeToken(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.email || decodedPayload.name || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
