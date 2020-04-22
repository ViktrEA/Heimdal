import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable } from 'rxjs';
import { environment } from './../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllProyecto(){
    return this.http.get(environment.apiUrl + '/gestion/proyecto/');
  }
}
