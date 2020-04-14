import { UsuarioModel } from './../models/usuario.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://127.0.0.1:8000';

  userToken: string;
  // headers = new HttpHeaders().set('Authorization', this.leerToken());


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
    const headers = new HttpHeaders({
      'Authorization': this.leerToken()
    });

    return this.http.post<any>(`${this.url}/gestion/user/`, authData, {headers })
      .pipe( map ( resp => {
          this.guardarToken(resp['idToken']);
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

}
