import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('weshare.userId')) {
      const userId = localStorage.getItem('weshare.userId');
      if (state.url === '/') {
        this.router.navigate(['profile', userId]);
      }

      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
