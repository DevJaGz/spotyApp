import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string | null = sessionStorage.getItem('token');

    let requestApi = request;

    if (token) {
      request = requestApi.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          sessionStorage.removeItem('token');
          this._authService.getSpotifyToken$().subscribe({
            next: (res) => {

              // console.log("HACER DE NUEVO EL REQUEST", res);
              this.router.navigateByUrl('/user');
            },
            error: (err) => {
              this.router.navigateByUrl('/user');
            }
          })

        }

        return throwError(err);

      })
    );
  }
}
