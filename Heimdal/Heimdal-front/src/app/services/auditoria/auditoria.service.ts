import { AuditoriaModel } from './../../models/auditoria.models';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl;


  crearAuditoria(auditoria: AuditoriaModel){
    const urlAut = this.url + '/gestion/auditoria/';
    return this.http.post(urlAut, auditoria)
      .pipe(map( (resp: any) => {
      }));
  }



}
