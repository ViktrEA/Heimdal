import { TiempoTareaModel } from './../../../models/tiempo_tarea.models';
import { RecursoService } from './../../../services/recursos/recurso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaService } from './../../../services/tarea/tarea.service';
import { Component, OnInit } from '@angular/core';
import { RecursoModel } from '../../../models/recurso.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styles: [
  ],
})
export class ActividadComponent implements OnInit {

  breadcrumbs: any[] = [];

  tiempoTarea: TiempoTareaModel[] = [];
  recurso = new RecursoModel();
  tarea: any;

  // tslint:disable-next-line: max-line-length
  constructor(private tareaService: TareaService, private route: ActivatedRoute, private recursoServicio: RecursoService, private router: Router) { }

  ngOnInit(): void {
    this.recogerId();
  }

  recogerId() {
    this.route.paramMap.subscribe(params => {
      this.traerRecurso(params.get('id'));
      this.mostrartiempoTarea(params.get('id'));
    });
  }

  traerRecurso(id) {
    this.recursoServicio.getRecursoUnit(id)
      .subscribe((res: any) => {
        this.recurso = res;

        this.breadcrumbs = [
          {
            titulo: 'Actividad de Recurso',
            titulo1: 'Recurso',
            urlTitulo1: '/recursos',
            tipo: res.tipo,
            subtitulo: 'Perfil',
            urlSubtitulo: '/recurso',
            subId: res.id,
            subtitulo1: 'Actividad',
          }
        ];
      });
  }

  mostrartiempoTarea(id) {
      this.tareaService.getTiempoTareaUsuario(id)
        .subscribe((resp: any) => {
          this.tiempoTarea = resp;

          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < resp.length; i++) {
            this.tareaService.getTarea(resp[i].tarea)
              .subscribe((rsta: any) => {
                this.tiempoTarea[i].tarea = rsta[0];
              });
          }
        });

  }

  eliminar(id, idRec) {
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
          // Hicieron click en "Sí"
          this.tareaService.eliminarTiempoTarea(id)
            .subscribe(res => {
              this.router.navigate(['/actividad_recurso/' + idRec]);
            });
        } else {
          // Dijeron que no
        }
      });

  }

}
