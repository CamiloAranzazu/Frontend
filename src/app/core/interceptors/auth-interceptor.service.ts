import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/modules/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const access_token: any = localStorage.getItem('access_token_olisoftoff');

    let request = req;

    if (access_token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ access_token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        // console.log('err',err);
        
        if (err.status === 401) {
          this.authService.cleanSession();
          this.router.navigateByUrl('/page/login');
        }
        return throwError( err );
      })
    );
  }

}