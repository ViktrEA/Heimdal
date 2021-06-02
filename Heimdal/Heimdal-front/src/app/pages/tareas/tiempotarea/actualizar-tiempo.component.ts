import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaService } from './../../../services/tarea/tarea.service';
import { TiempoTareaModel } from './../../../models/tiempo_tarea.models';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { RecursoService } from 'src/app/services/recursos/recurso.service';


@Component({
  selector: 'app-actualizar-tiempo',
  templateUrl: './actualizar-tiempo.component.html',
  styles: [
  ],
})
export class ActualizarTiempoComponent implements OnInit {

  breadcrumbs: any [] = [];

  tiempoTarea = new  TiempoTareaModel();
  idTarea: any;
  idTiempo;
  id;
  usuario: any;

  // tslint:disable-next-line: max-line-length
  constructor( public tareaService: TareaService, private route: ActivatedRoute, private recursoService: RecursoService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.userLog();
  }

  userLog(){
    this.recursoService.getRecursoUnit(this.auth.recurso.id)
      .subscribe( resp =>{
        this.usuario = resp;
        this.traerTiempoTarea();
      });
  }

  traerTiempoTarea(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      if (this.usuario.tipo === 'A') {
        this.tareaService.getTiempoTareaUnit(this.id)
          .subscribe((resp: any) => {
            this.tiempoTarea = resp;
            this.idTarea = resp.tarea;
            this.idTiempo = resp.id;

            this.tareaService.getTarea(resp.tarea)
              .subscribe((res: any) => {
                this.breadcrumb(res);
              });
          });

      } else if (this.usuario.tipo === 'B' && this.usuario.asignados_tiempo.indexOf(parseInt(this.id)) !== -1) {
        this.tareaService.getTiempoTareaUnit(this.id)
          .subscribe((resp: any) => {
            this.tiempoTarea = resp;
            this.idTarea = resp.tarea;
            this.idTiempo = resp.id;

            this.tareaService.getTarea(resp.tarea)
              .subscribe((res: any) => {
                this.breadcrumb(res);
              });
          });

      } else if (this.usuario.tipo === 'C' && this.usuario.asignados_tiempo.indexOf(parseInt(this.id)) !== -1) {
        this.tareaService.getTiempoTareaUnit(this.id)
          .subscribe((resp: any) => {
            this.tiempoTarea = resp;
            this.idTarea = resp.tarea;
            this.idTiempo = resp.id;

            this.tareaService.getTarea(resp.tarea)
              .subscribe((res: any) => {
                this.breadcrumb(res);
              });
          });

      } else {

        this.router.navigateByUrl('/dashboard');

      }

    });

  }


  breadcrumb(res){
    this.breadcrumbs = [
      {
        titulo: 'Editar Horas a Tarea: ',
        nombre: res[0].nombre,
        titulo1: 'Poyectos',
        urlTitulo1: '/proyectos',
        subtitulo: 'Tareas',
        urlSubtitulo: '/tareas',
        subId: res[0].proyecto,
        subtitulo1: 'Tarea',
        urlSubtitulo1: '/tarea',
        subId1: res[0].id,
        subtitulo2: 'Editar horas a Tarea',
      }
    ];
  }


  guardar(form: NgForm){
    this.tareaService.actualizarTiempoTarea(this.tiempoTarea)
      .subscribe( (resp: any) => {

      });

  }
}
