import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioModel } from './../models/usuario.models';
import { Observable } from 'rxjs';



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

  logout(){
    localStorage.removeItem('token');
    this.userToken = '';
  }

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

  estaAutenticado():boolean{
    return this.userToken.length>6;

  }

  getAllRecursos(): Observable<any>{
    return this.http.get(this.url + '/gestion/recurso/', {headers: this.headers});
  }

  getAllProyectos(): Observable<any>{
    return this.http.get(this.url + '/gestion/proyecto/', {headers: this.headers});
  }

}
