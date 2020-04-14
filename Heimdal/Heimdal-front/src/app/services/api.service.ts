import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
  export class ApiService {

  constructor(private http: HttpClient) { }

  registroNuevoUsuario(userData): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/gestion/user/', userData);
  }
  loginUsuario(userData): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/auth/', userData);
  }

}
