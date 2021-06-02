import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( public authService: AuthService){}

  canActivate() {
    if (this.authService.recurso.tipo === 'A') {
      return true;
    }else{
      return false;
    }
  }

}
