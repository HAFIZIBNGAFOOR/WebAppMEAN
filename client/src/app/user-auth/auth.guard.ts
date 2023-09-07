import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('login true in auth guard ');
      return true;
    } else {
      console.log(' auth guard in deleting token and nvigating to login');
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
}

