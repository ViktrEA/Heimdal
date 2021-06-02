import { AuthService } from './../../services/auth.service';
import { ProyectoService } from './../../services/proyecto/proyecto.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TareaModel } from '../../models/tarea.models';
import { RecursoModel } from '../../models/recurso.models';
import { RecursoService } from '../../services/recursos/recurso.service';
import { TareaService } from '../../services/tarea/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea-crear',
  templateUrl: './tarea-crear.component.html',
  styles: [
  ],
})
export class TareaCrearComponent implements OnInit {

  breadcrumbs: any [] = [];

  tarea = new TareaModel();
  recursos: RecursoModel [] = [];
  recursoCreacionTipo;
  usuario: any;
  id;

  // tslint:disable-next-line: max-line-length
  constructor(private tareaService: TareaService, private recursoService: RecursoService, private route: ActivatedRoute, private router: Router, private proyectoService: ProyectoService, private auth: AuthService) {
  }

  ngOnInit(): void {

    this.recursoLog();

  }

  recursoLog() {
    this.recursoService.getRecursoUnit(this.auth.recurso.id)
      .subscribe((res: any) => {
        this.usuario = res;
        this.asigPTarea();
      });
  }

  allRecursosP(id){
    this.recursoService.getRecursosForUserA(id)
      .subscribe((resp: any) => {
        this.recursos = resp;
      });
  }

  asigPTarea(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.allRecursosP(this.id);

      if (this.usuario.tipo === 'A') {
        this.tarea.proyecto = this.id;
        this.proyectoService.getProyecto(this.id)
          .subscribe((resp: any) => {
            this.breadcrumb(resp);
          });


      } else if (this.usuario.tipo === 'B' && this.usuario.asignados_proyecto.indexOf(parseInt(this.id)) !== -1) {
        this.tarea.proyecto = this.id;
        this.proyectoService.getProyecto(this.id)
          .subscribe((resp: any) => {
            this.breadcrumb(resp);
          });

      } else if (this.usuario.tipo === 'C' && this.usuario.asignados_proyecto.indexOf(parseInt(this.id)) !== -1) {
        this.tarea.proyecto = this.id;
        this.proyectoService.getProyecto(this.id)
          .subscribe((resp: any) => {
            this.breadcrumb(resp);
          });

      } else {

        this.router.navigateByUrl('/dashboard');

      }

    });
  }

  breadcrumb(resp){
    this.breadcrumbs = [{
      titulo: 'Crear Tarea de proyecto: ',
      nombre: resp[0].nombre,
      urlNombre: '/proyecto',
      id: resp[0].id,
      titulo1: 'Proyecto',
      urlTitulo1: '/proyectos',
      subtitulo: 'Tarea',
      urlSubtitulo: '/tareas',
      subId: resp[0].id,
      subtitulo1: 'Crear Tarea'
    }];
  }

  guardar(form: NgForm){

    if(this.usuario.tipo === 'C'){
      this.tarea.estado = 'P';
    }
    else {
      this.tarea.estado = 'A';
    }

    this.tarea.usuario_creacion = this.usuario.id;

    if (form.invalid) {
    return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    peticion = this.tareaService.crearTarea(this.tarea);

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.tarea.nombre,
        text: 'Se creó correctamente',
        icon: 'success'
      });
      this.goTo(this.tarea.proyecto);
    });
  }

  goTo(id){
    this.router.navigate(['tareas/' + id]);
  }

}
