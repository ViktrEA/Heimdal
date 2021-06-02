import { AuditoriaModel } from './../../models/auditoria.models';
import { AuditoriaService } from './../auditoria/auditoria.service';
import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ProyectoModel } from '../../models/proyecto.models';
import { map } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient, private auditoriaService: AuditoriaService) { }

  crearProyecto(proyecto: ProyectoModel){
    return this.http.post(`${this.url}/gestion/proyecto/`, proyecto)
     .pipe(
       map( (resp: any) => {
         proyecto.id = resp.id;
         return proyecto;
       })
     );

  }

  actualizarProyecto(proyecto: ProyectoModel){
    return this.http.put(`${this.url }/gestion/proyecto/${proyecto.id}/ `, proyecto)
      .pipe(map((resp: any) => {
        let auditoria: AuditoriaModel = {
            usuario_cambio: parseInt(localStorage.getItem('recurso_id')),
            tipo: 'P',
            referencia_id: resp.id
          };
        this.auditoriaService.crearAuditoria(auditoria)
          .subscribe( res => {
          });
      }));

  }

  getProyecto(proyectoId){
    return this.http.get(`${this.url}/gestion/proyecto/?id=${proyectoId}`);
  }
  getAllProyecto(){
    return this.http.get(`${this.url}/gestion/proyecto/`);
  }
    getProyectoEstadoUser(estado, idUser?){
      if (idUser) {
        return this.http.get(`${this.url}/gestion/proyecto/?usuarios_asignados=${idUser}&estado=${estado}`);
      }
      else {
        return this.http.get(`${this.url}/gestion/proyecto/?estado=${estado}`);

      }

    }
    buscarProyecto(input: string){
      return this.http.get(`${this.url}/gestion/proyecto/?search= ${input}`);
    }
    cierreProyecto(proyId ): Observable<any>
    {
      return this.http.patch(`${this.url }/gestion/proyecto/${proyId}/ `, {estado: 'F'});
    }

}

