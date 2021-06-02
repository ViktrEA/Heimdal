import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardChildService implements CanActivateChild {

  constructor(private auth: AuthService, private router: Router) { }

  canActivateChild(): boolean {
    if (this.auth.estaAutenticado()) {
      return true;
    } else {

      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
