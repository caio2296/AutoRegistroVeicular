import { HttpEvent, HttpHandlerFn, HttpRequest, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AutenticaService } from '../Services/Autentica.Service';
import { Observable } from 'rxjs';

export const Interceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const autenticaService = inject(AutenticaService); // Injeção direta no interceptor
  const token = autenticaService.ObterToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
