import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const rawToken = this.cookieService.get('Authorization');
    const token = decodeURIComponent(rawToken); // ✅ فك التشفير
    if (token) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: token
        }
      });

      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}
