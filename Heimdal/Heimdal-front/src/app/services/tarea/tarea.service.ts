import { AuditoriaService } from './../auditoria/auditoria.service';
import { AuditoriaModel } from './../../models/auditoria.models';
import { TiempoTareaModel } from './../../models/tiempo_tarea.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { TareaModel } from 'src/app/models/tarea.models';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private auditoriaService: AuditoriaService) { }

  // TAREA

  getAllTarea(proyId){
    return this.http.get(environment.apiUrl + '/gestion/tarea/?proyecto=' + proyId);
  }

  getAllTareaFiltro(proyId?, usu_asig?, estado?){
    if (usu_asig){
      return this.http.get(environment.apiUrl + '/gestion/tarea/?proyecto=' + proyId + '&usuarios_asignados=' + usu_asig + '&estado=' + estado);
    }
    else{
      return this.http.get(environment.apiUrl + '/gestion/tarea/?proyecto=' + proyId + '&estado=' + estado);
    }
  }

  getTarea(tareaId){
    return this.http.get(environment.apiUrl + '/gestion/tarea/?id=' + tareaId);
  }

  editTarea(tarea: TareaModel) {
    return this.http.put(`${this.url}/gestion/tarea/${tarea.id}/`, tarea)
    .pipe(map((resp: any) => {
      let auditoria: AuditoriaModel = {
        usuario_cambio: parseInt(localStorage.getItem('recurso_id')),
        tipo: 'T',
        referencia_id: resp.id
      };
      this.auditoriaService.crearAuditoria(auditoria)
      .subscribe(res => {
      });
    }));
  }

  crearTarea(tarea: TareaModel){
    return this.http.post(`${this.url}/gestion/tarea/`, tarea)
    .pipe(map( (resp: any) => {
      tarea.codigo = resp.codigo;
      return tarea;
    }));
  }

  eliminarTarea(id){
    return this.http.delete(`${this.url}/gestion/tarea/${id}/`)
    .pipe(map( resp =>  {
      Swal.fire({
        title: 'La tarea se eliminó correctamente!',
        icon: 'success',
        confirmButtonText: 'ok',
      });
    }));
  }

  finalizarTarea(id, data){
    return this.http.patch(`${this.url}/gestion/tarea/${id}/`, data)
  }



  //COMENTARIOS

  getComentarioTarea(tareaId){
    return this.http.get(environment.apiUrl + '/gestion/comentario/?tarea=' + tareaId + '&ordering=-fecha_creacion');
  }

  editarComentario(comentarioId, texto){
    return this.http.patch(`${this.url}/gestion/comentario/${comentarioId}/`, texto);
  }

  crearComentario(comentario){
    return this.http.post(`${this.url}/gestion/comentario/`, comentario)
    .pipe(map( (resp: any) => {
      comentario.id = resp.id;
      return comentario;
    }));
  }

  eliminarComentario(id){
    return this.http.delete(`${this.url}/gestion/comentario/${id}/`)
    .pipe(map( resp =>  {
      Swal.fire({
        title: 'El comentario se eliminó correctamente!',
        icon: 'success',
        confirmButtonText: 'ok',
      });
    }));
  }



  //TIEMPO-TAREA

  getTiempoTarea(id){
    return this.http.get(this.url + '/gestion/tiempo_tarea/?tarea=' + id);
  }

  getTiempoTareaUsuario(id){
    return this.http.get(this.url + '/gestion/tiempo_tarea/?ordering=-fecha&usuario=' + id);
  }


  getTiempoTareaUnit(id){
    return this.http.get(this.url + '/gestion/tiempo_tarea/' + id + '/');
  }

  crearTiempoTarea(tiempoTarea: TiempoTareaModel) {
    const urlTarea = this.url + '/gestion/tiempo_tarea/?tarea=';
    return this.http.post(urlTarea, tiempoTarea)
    .pipe(map((resp: any) => {
      Swal.fire({
        title: 'Tiempo Asignado Correctamente!',
        text: 'Horas: ' + resp.horas,
        icon: 'success',
        confirmButtonText: 'ok',
      });
      this.router.navigate(['/tiempo_tarea/' + resp.tarea]);
    }));
  }


  actualizarTiempoTarea(tiempoTarea: TiempoTareaModel) {
    return this.http.put(`${this.url}/gestion/tiempo_tarea/${tiempoTarea.id}/`, tiempoTarea)
      .pipe(map((resp: any) => {
        Swal.fire({
          title: 'Tiempo Asignado Correctamente!',
          text: 'Horas: ' + resp.horas,
          icon: 'success',
          confirmButtonText: 'ok',
        });
        this.router.navigate(['/tiempo_tarea/' + resp.tarea]);
      }));
  }

  eliminarTiempoTarea(id){
    return this.http.delete(`${this.url}/gestion/tiempo_tarea/${id}/`)
      .pipe(map( resp =>  {
        Swal.fire({
          title: 'El registro se borro correctamente!',
          icon: 'success',
          confirmButtonText: 'ok',
        });
      }));
  }
}
