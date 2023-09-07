import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AdminService } from './services/admin.service';
import { selectAdminSignupError, selectIsloggedIn } from './store/admin-auth.selector';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private adminService: AdminService, private router:Router,private store:Store) {}
  adminAuthGuard:string=''
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):boolean  {
    if (this.adminService.isLoggedIn()) {
      return true;
    } else {
      this.adminService.deleteToken();
      this.router.navigate(['/admin/login'])
      return false;
    }
  }
}
