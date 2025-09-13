import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private static currentToken: string | null = null;
  private tokenUrl = `${environment.apiBaseUrl}/oauth2/token`;
  private client_id = 'angular-app';
  private client_secret = 'angular-secret';

  constructor(private http: HttpClient) {}

  getToken(): Observable<string | null> {

    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expires_at');
    AuthService.currentToken = null;
    const now = Date.now();
    return this.http.post<{ access_token: string, expires_in?: number }>(this.tokenUrl, {
      client_id: this.client_id,
      client_secret: this.client_secret
    }).pipe(
      tap(res => {
        if (res && res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          AuthService.currentToken = res.access_token;
          if (res.expires_in) {
            localStorage.setItem('access_token_expires_at', String(now + res.expires_in * 1000));
          } else {
            localStorage.setItem('access_token_expires_at', String(now + 3600 * 1000));
          }
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('access_token_expires_at');
          AuthService.currentToken = null;
        }
      }),
      catchError(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_token_expires_at');
        AuthService.currentToken = null;
        return of(null);
      }),
      map(res => res && res.access_token ? res.access_token : null)
    );
  }

  static getTokenSync(): string | null {
    return AuthService.currentToken || localStorage.getItem('access_token');
  }

  clearToken() {
    localStorage.removeItem('access_token');
    AuthService.currentToken = null;
  }
}
