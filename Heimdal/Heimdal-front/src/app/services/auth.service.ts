import { Router } from '@angular/router';
import { RecursoService } from './recursos/recurso.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioModel } from './../models/usuario.models';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl;

  recurso: any;
  userToken: string;
  recurso_id: any;


  constructor(private http: HttpClient, private recursoService: RecursoService, private router: Router) {
    this.cargarStorage();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('recurso');
    localStorage.removeItem('recurso_id');
    this.userToken = '';
    this.recurso = '';
    this.recurso_id = '';
    this.router.navigateByUrl('/login');
  }

  login( usuario: UsuarioModel){

    return this.http.post(`${this.url}/auth/`, usuario)
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp['token']);
          localStorage.setItem('recurso', JSON.stringify(resp['recurso']));
          this.cargarStorage();
          return resp;
        })
    );

  }

  // nuevoUsuario( usuario: UsuarioModel ){
  //   const authData = {
  //     ...usuario
  //   };

  //   return this.http.post<any>(`${this.url}/gestion/user/`, authData)
  //     .pipe( map ( resp => {
  //         this.guardarToken(resp['idToken']);
  //         console.log(resp);
  //         return resp;
  //     }));
  // }


  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.recurso = JSON.parse(localStorage.getItem('recurso'));
      this.userToken = localStorage.getItem('token');
      this.recurso_id = localStorage.setItem('recurso_id', this.recurso.id);

    } else {
      this.userToken = '';
      this.recurso = '';
    }

    return this.userToken;

  }

  estaAutenticado(): boolean{
    if(this.userToken){
      return this.userToken.length > 6;
    }else{
      return;
    }

  }


}
