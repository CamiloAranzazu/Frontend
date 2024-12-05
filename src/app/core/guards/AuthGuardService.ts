

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/modules/auth.service';
@Injectable({
    providedIn: 'root'
  })
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['/page/login'],{queryParams:{'returnURL':state.url}});
    //   return false;
    // }
    return true;
  }
}