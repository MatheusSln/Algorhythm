import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageUtils } from '../utils/localstorage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  localStorageUtil = new LocalStorageUtils();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.localStorageUtil.cleanLocalDataUser();
            this.router.navigate(['/account/login']);
          }
          if (error.status === 403) {
            this.router.navigate(['/access-denied']);
          }

          if(error.status == 0){
            this.router.navigate(['/home']);
          }
        }

        return throwError(error);
      })
    );
  }
}
