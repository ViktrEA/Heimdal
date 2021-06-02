import { AuditoriaModel } from './../../models/auditoria.models';
import { AuditoriaService } from './../auditoria/auditoria.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RecursoModel } from 'src/app/models/recurso.models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient, private auditoriaService: AuditoriaService) { }

  getDetRec(detRecId){
    return this.http.get(environment.apiUrl + '/gestion/recurso/?id=' + detRecId);
  }

  getAllRecursos(){
    return this.http.get(`${this.url}/gestion/recurso/?activo=true`);
  }

  getRecursosForUserA(id){
    return this.http.get(`${this.url}/gestion/recurso/?asignados_proyecto=` + id);
  }

  getRecursoUnit(id){
    return this.http.get(environment.apiUrl + '/gestion/recurso/' + id + '/');

  }

  editarRecurso(formulario: FormData){
    return this.http.patch(environment.apiUrl + '/gestion/recurso/' + formulario.get('id') + '/', formulario)
            .pipe(map((resp: any) => {
              let auditoria: AuditoriaModel = {
                usuario_cambio: parseInt(localStorage.getItem('recurso_id')),
                tipo: 'R',
                referencia_id: resp.id
              };
              this.auditoriaService.crearAuditoria(auditoria)
                .subscribe(res => {
                });
            }));
  }

  creaRecurso(formulario: FormData){
    console.log(formulario);
    return this.http.post(environment.apiUrl + '/gestion/recurso/', formulario);
  }

  eliminaRecurso(id){
    return this.http.patch(environment.apiUrl + '/gestion/recurso/'+id+'/', {activo: false});
  }

}
