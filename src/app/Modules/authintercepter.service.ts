import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatsnackbarService } from './matsnackbar.service';
import 'rxjs/add/operator/do';


@Injectable({
  providedIn: 'root'
})
export class AuthintercepterService implements HttpInterceptor {
  constructor(private matsnackbar: MatsnackbarService, private router: Router) {debugger}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    
    const user = this.matsnackbar.fnGetToken();
    if (user && user.accessToken) {
      headersConfig['Authorization'] = `bearer ${user.accessToken}`;
    }
    
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req).do(
      (event: HttpEvent<any>) => {},
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.matsnackbar.fnRemoveToken();
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }
  
}

