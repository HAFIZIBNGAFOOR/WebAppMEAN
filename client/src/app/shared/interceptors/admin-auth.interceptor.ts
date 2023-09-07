import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/admin-auth/services/admin.service';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
  constructor(private adminService:AdminService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.adminService.getAdminToken();
    if(token){
      request = request.clone({
        setHeaders:{
          Authorisation:`Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}
