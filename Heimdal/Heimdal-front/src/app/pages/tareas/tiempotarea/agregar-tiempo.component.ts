import { RecursoService } from './../../../services/recursos/recurso.service';
import { AuthService } from './../../../services/auth.service';
import { TareaService } from './../../../services/tarea/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TiempoTareaModel } from './../../../models/tiempo_tarea.models';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-tiempo',
  templateUrl: './agregar-tiempo.component.html',
  styles: [
  ],
})
export class AgregarTiempoComponent implements OnInit {

  breadcrumbs: any [] = [];

  tiempoTarea = new TiempoTareaModel();
  usuario: any;
  tareaId;

  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private tareaService: TareaService, private auth: AuthService,private recursoService: RecursoService, private router: Router) {
  }

  ngOnInit(): void {
    this.usuarioLog();
  }

  usuarioLog(){
    this.recursoService.getRecursoUnit(this.auth.recurso.id)
      .subscribe( resp => {
        this.usuario = resp;
        this.tiempoT();
      });
  }

  tiempoT(){
    this.route.paramMap.subscribe(params => {
      this.tareaId = params.get('id');

      if (this.usuario.tipo === 'A') {
        this.tareaService.getTarea(this.tareaId)
          .subscribe((res: any) => {
            this.breadcrumb(res);
          });
      } else if (this.usuario.tipo === 'B' && this.usuario.asignados_tarea.indexOf(parseInt(this.tareaId)) !== -1) {
        this.tareaService.getTarea(this.tareaId)
          .subscribe((res: any) => {
            this.breadcrumb(res);
          });
      } else if (this.usuario.tipo === 'C' && this.usuario.asignados_tarea.indexOf(parseInt(this.tareaId)) !== -1) {
        this.tareaService.getTarea(this.tareaId)
          .subscribe((res: any) => {
            this.breadcrumb(res);
          });
      } else {

        this.router.navigateByUrl('/dashboard');

      }

    });
  }

  breadcrumb(res){
    this.breadcrumbs = [
      {
        titulo: 'Agregar Horas a Tarea: ',
        nombre: res[0].nombre,
        titulo1: 'Poyectos',
        urlTitulo1: '/proyectos',
        subtitulo: 'Tareas',
        urlSubtitulo: '/tareas',
        subId: res[0].proyecto,
        subtitulo1: 'Tarea',
        urlSubtitulo1: '/tarea',
        subId1: res[0].id,
        subtitulo2: 'Agregar horas a Tarea',
      }
    ];
  }

  guardar( tiempo: TiempoTareaModel){

    tiempo.usuario = this.usuario.id;
    tiempo.tarea = this.tareaId;

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.tareaService.crearTiempoTarea(tiempo)
      .subscribe( resp => {
      });

  }

}
