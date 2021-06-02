import { AuthService } from './../../../services/auth.service';
import { TareaModel } from 'src/app/models/tarea.models';
import { TiempoTareaModel } from './../../../models/tiempo_tarea.models';
import { RecursoService } from '../../../services/recursos/recurso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaService } from './../../../services/tarea/tarea.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tiempotarea',
  templateUrl: './tiempotarea.component.html',
  styles: [
  ],
})
export class TiempotareaComponent implements OnInit {
  breadcrumbs: any[] = [];

  tiempoTarea: TiempoTareaModel[] = [];
  tarea = new TareaModel();
  recurso: any;
  usuario: any;
  id;

  // tslint:disable-next-line: max-line-length
  constructor(private tareaService: TareaService, private route: ActivatedRoute, private recursoServicio: RecursoService, private router: Router, private auth: AuthService ) {
  }



  ngOnInit(): void {
    this.recursoLog();
  }

  recursoLog(){
    this.recursoServicio.getRecursoUnit(this.auth.recurso.id)
      .subscribe( (resp: any) => {
          this.usuario = resp;
          console.log(this.usuario);
          this.recogerId();
      });
  }

  recogerId(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.usuario.tipo === 'A') {
        this.traerTarea(this.id);
        this.mostrartiempoTarea(this.id);
      } else if (this.usuario.tipo === 'B' && this.usuario.asignados_tarea.indexOf(parseInt(this.id)) !== -1) {
        this.traerTarea(this.id);
        this.mostrartiempoTarea(this.id);
      } else if (this.usuario.tipo === 'C' && this.usuario.asignados_tarea.indexOf(parseInt(this.id)) !== -1) {
        this.traerTarea(this.id);
        this.mostrartiempoTarea(this.id);
      } else {
        this.router.navigateByUrl('/dashboard');
      }

    });
  }

  traerTarea(id){
    this.tareaService.getTarea(id)
      .subscribe((res: any) => {
        this.tarea = res[0];
        this.breadcrumb(res);
      });
  }

  breadcrumb(res){
    this.breadcrumbs = [
      {
        titulo: 'Tiempos de Tarea: ',
        nombre: res[0].nombre,
        titulo1: 'Poyectos',
        urlTitulo1: '/proyectos',
        subtitulo: 'Tareas',
        urlSubtitulo: '/tareas',
        subId: res[0].proyecto,
        subtitulo1: 'Tarea',
        urlSubtitulo1: '/tarea',
        subId1: res[0].id,
        subtitulo2: 'Actividad de Tarea',
      }
    ];
  }

  mostrartiempoTarea(id){
      this.tareaService.getTiempoTarea(id)
        .subscribe( (resp: any ) => {
          this.tiempoTarea = resp;

          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < resp.length; i++) {
            this.recursoServicio.getRecursoUnit(resp[i].usuario)
              .subscribe((rsta: any) => {
                this.tiempoTarea[i].usuario = rsta;
              });
            }
        });

  }

  eliminar(id){
    Swal.fire({
      title: 'Eliminar',
      text: 'Esta seguro que desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })
    .then(resultado => {
      if (resultado.value) {
        this.tareaService.eliminarTiempoTarea(id)
        .subscribe(res => {
            this.recogerId();
        });
      }
    });

  }

}
