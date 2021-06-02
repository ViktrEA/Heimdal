import { AuthService } from './../../services/auth.service';
import { ProyectoService } from './../../services/proyecto/proyecto.service';
import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea/tarea.service';
import { ActivatedRoute } from '@angular/router';
import { RecursoService } from 'src/app/services/recursos/recurso.service';
import { RecursoModel } from '../../models/recurso.models';
import { ProyectoModel } from '../../models/proyecto.models';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: [
  ],
})
export class TareasComponent implements OnInit {

  breadcrumbs: any[] = [];
  proyecto = new ProyectoModel();

  tarea;
  idProyecto;
  usuario: any;
  recurso = new RecursoModel();
  estadoTarea;
  tipoUsuario;

  constructor(private tareaService: TareaService, private recursoService: RecursoService, 
  private route: ActivatedRoute, private proyectoService: ProyectoService, private auth: AuthService ) {
    this.usuario = this.auth.recurso;
  }

  ngOnInit(): void {
    this.getIdProyecto();
  }

  getIdProyecto(){
    this.route.paramMap.subscribe(params => {
      this.idProyecto = params.get('id');
      if (this.idProyecto != null){
        this.getProyecto();
      }
      else {
        this.breadcrumb();
      }
      this.mostrarRecurso();
    });
  }

  breadcrumb(){
    this.breadcrumbs = [{
      titulo: 'Tareas ',
      titulo1: 'Tareas',
    }];
  }

  getProyecto(){
    this.proyectoService.getProyecto(this.idProyecto)
    .subscribe( (resp: any) => {
      this.breadcrumbs = [{
        titulo: 'Proyecto: ',
        nombre: resp[0].nombre,
        urlNombre: '/proyecto',
        id: resp[0].id,
        titulo1: 'Proyecto',
        urlTitulo1: '/proyectos',
        subtitulo: 'Tareas',
      }];
    });
  }

  mostrarRecurso(){
    this.mostrar('');
  }

  mostrar(estadoTarea) {
    if (this.estadoTarea === undefined){
      if (this.idProyecto == null){
        if (this.usuario.tipo === 'C'){
          this.tarea = this.tareaService.getAllTareaFiltro('', this.usuario.id, '');
        }
        else {
          this.tarea = this.tareaService.getAllTareaFiltro('', '', '');
        };
      }
      else {
        if (this.usuario.tipo === 'C'){
          this.tarea = this.tareaService.getAllTareaFiltro(this.idProyecto, this.usuario.id, '');
        }
        else {
          this.tarea = this.tareaService.getAllTareaFiltro(this.idProyecto, '', '');
        };
      };
    }
    else {
      if (this.idProyecto == null){
        if (this.usuario.tipo === 'C'){
          this.tarea = this.tareaService.getAllTareaFiltro('', this.usuario.id, this.estadoTarea);
        }
        else {
          this.tarea = this.tareaService.getAllTareaFiltro('', '', this.estadoTarea);
        };
      }
      else {
        if (this.usuario.tipo === 'C'){
          this.tarea = this.tareaService.getAllTareaFiltro(this.idProyecto, this.usuario.id, this.estadoTarea);
        }
        else {
          this.tarea = this.tareaService.getAllTareaFiltro(this.idProyecto, '', this.estadoTarea);
        };
      };
    }
  };

  onEstadoSelect(estado): void{
    this.estadoTarea = estado;
    this.mostrar(estado);
  };

  eliminar(id){
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que desea eliminar esta tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    })
    .then(resultado => {
      if (resultado.value) {
        this.tareaService.eliminarTarea(id)
        .subscribe(res => {
          this.getIdProyecto();
        });
      }
    });
  }
}

