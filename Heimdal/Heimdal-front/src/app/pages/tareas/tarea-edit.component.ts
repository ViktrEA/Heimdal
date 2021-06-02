import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaService } from '../../services/tarea/tarea.service';
import { TareaModel } from '../../models/tarea.models';
import { Location } from '@angular/common';
import { RecursoModel } from '../../models/recurso.models';
import { RecursoService } from '../../services/recursos/recurso.service';
import Swal from 'sweetalert2';
import { ProyectoService } from '../../services/proyecto/proyecto.service';


@Component({
  selector: 'app-tarea-edit',
  templateUrl: './tarea-edit.component.html',
  styles: [
  ],
})


export class TareaEditComponent implements OnInit {

  breadcrumbs: any [] = [];

  id;
  tarea = new TareaModel();
  recursos: RecursoModel [] = [];
  usuario: any;

  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private recursoService: RecursoService, private tareaService: TareaService, location: Location, private proyectoService: ProyectoService, private auth: AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.recursoLog();

  }

  recursoLog(){
    this.recursoService.getRecursoUnit(this.auth.recurso.id)
      .subscribe( (res: any) => {
        this.usuario = res;
        this.valTarRecursos();
      });
  }

  valTarRecursos(){
    if (this.usuario.tipo === 'A') {
      this.traerTarea();
    } else if (this.usuario.tipo === 'B' && this.usuario.asignados_tarea.indexOf(parseInt(this.id)) !== -1) {
      this.traerTarea();
    } else if (this.usuario.tipo === 'C' && this.usuario.asignados_tarea.indexOf(parseInt(this.id)) !== -1) {
      this.traerTarea();
    } else {

      this.router.navigateByUrl('/dashboard');

    }


  }

  traerTarea(){
    this.tareaService.getTarea(this.id)
      .subscribe(data => {
        this.tarea = data[0];
        this.proyectoService.getProyecto(this.tarea.proyecto)
          .subscribe((resp: any) => {
            this.recursoService.getRecursosForUserA(resp[0].id)
              .subscribe((resp: any) => {
                this.recursos = resp;
              });
            this.breadcrumb(resp, data);
          });
      },
        error => console.log(error));
  }

  breadcrumb(resp,data){
    this.breadcrumbs = [{
      titulo: 'Editar Tarea de proyecto: ',
      nombre: resp[0].nombre,
      urlNombre: '/proyecto',
      id: resp[0].id,
      titulo1: 'Poyectos',
      urlTitulo1: '/proyectos',
      subtitulo: 'Tareas',
      urlSubtitulo: '/tareas',
      subId: resp[0].id,
      subtitulo1: 'Tarea',
      urlSubtitulo1: '/tarea',
      subId1: data[0].id,
      subtitulo2: 'Editar Tarea',
    }];
  }

  editTarea(){
    this.tareaService.editTarea(this.tarea)
    .subscribe(data => {
      Swal.fire({
        title: this.tarea.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      })
      this.goTo(this.id);
    },
    error => console.log(error));
  }

  onSubmit(){
    this.editTarea();
  }

  goTo(id){
    this.router.navigate(['tarea/'+id])
  }
}
