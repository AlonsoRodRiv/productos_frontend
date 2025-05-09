import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NgrokInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('https://5b3b-190-86-106-207.ngrok-free.app')) {
      const modifiedRequest = request.clone({
        headers: request.headers
          .set('ngrok-skip-browser-warning', 'true')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Access-Control-Allow-Origin', '*')
          .set(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
          )
          .set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
          .set('Access-Control-Allow-Credentials', 'true')
          .set('Access-Control-Max-Age', '3600')
          .set('Access-Control-Expose-Headers', 'Content-Type, Authorization'),
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
