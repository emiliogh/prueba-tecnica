import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export function authInterceptorFn(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  
  if (req.url.includes('/oauth2/token')) {
    return next(req);
  }

  const authService = inject(AuthService);
  
  const expiresAt = localStorage.getItem('access_token_expires_at');
  const now = Date.now();
  let token = AuthService.getTokenSync();
  const isExpired = expiresAt ? now > Number(expiresAt) : true;

  if (!token || isExpired) {    
    return authService.getToken().pipe(
      switchMap(newToken => {
        if (newToken) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });
          return next(authReq);
        } else {          
          return next(req);
        }
      })
    );
  } else {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
}
