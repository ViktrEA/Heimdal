import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioModel } from './../models/usuario.models';
import { RecursoModel } from './../models/recurso.models';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://127.0.0.1:8000';

  userToken: string;
  headers = new HttpHeaders().set('Authorization', this.leerToken());


  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout(){}

  login( usuario: UsuarioModel){
    const authData = {
      ...usuario
    };

    return this.http.post(`${this.url}/auth/`, authData)
      .pipe(
        map(resp => {
          this.guardarToken( resp['token'] );
          return resp;
        })
    );

  }

  nuevoUsuario( usuario: UsuarioModel ){
    const authData = {
      ...usuario
    };

    return this.http.post<any>(`${this.url}/gestion/user/`, authData)
      .pipe( map ( resp => {
          this.guardarToken(resp['idToken']);
          console.log(resp);
          return resp;
      }));
  }


  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  nuevoRecurso( recurso: RecursoModel){
    const authData = {
      ...recurso
    };

    return this.http.post<any>(`${this.url}/gestion/user/`, authData)
      .pipe(map(resp => {
        console.log(resp);
        return resp;
      }));
  }

}
