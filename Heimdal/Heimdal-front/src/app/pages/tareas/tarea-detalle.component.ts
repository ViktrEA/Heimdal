import { AuthService } from './../../services/auth.service';
import { ProyectoService } from './../../services/proyecto/proyecto.service';
import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoService } from 'src/app/services/recursos/recurso.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tarea-detalle',
  templateUrl: './tarea-detalle.component.html',
  styles: [
  ],
})
export class TareaDetalleComponent implements OnInit {

  breadcrumbs: any [] = [];
  usuComentario;
  usuCreacion;
  nombres: any [] = [];
  tarea;
  tareaId;
  comentario;
  comentTexto;
  comentEdit;
  idComentario;
  usuario: any;
  paramId;

  // tslint:disable-next-line: max-line-length
  constructor(private tareaService: TareaService, private router: Router, private route: ActivatedRoute, private recursoService: RecursoService, private proyectoService: ProyectoService, private auth: AuthService) {
  }

  ngOnInit(): void {

    this.recursoLog();
    this.tareaId = this.route.snapshot.params.id;

  }

  recursoLog() {
    this.recursoService.getRecursoUnit(this.auth.recurso.id)
      .subscribe((resp: any) => {
        this.usuario = resp;
        this.getTarea();

      });
  }

  getTarea(){
    this.route.paramMap.subscribe(params => {
      this.paramId = params.get('id');

      if (this.usuario.tipo === 'A'){
      // ------.---------
      this.tarea = this.tareaService.getTarea(this.paramId);
      this.comentario = this.tareaService.getComentarioTarea(this.paramId)
      this.tareaService.getComentarioTarea(this.paramId)
      .subscribe((resp: any) => {
        if (resp.length > 0){
          this.recursoService.getRecursoUnit(resp[0].usuario)
          .subscribe((rsta: any) => {
            this.usuComentario = rsta.nombre;
          });
        };
      });

      this.tareaService.getTarea(this.paramId)
      .subscribe( (resp: any) => {
        this.proyectoService.getProyecto( resp[0].proyecto)
        .subscribe( (res: any) => {
          this.breadcrumb(res);
        });

        this.recursoService.getRecursoUnit(resp[0].usuario_creacion)
        .subscribe((rsta: any) => {
          this.usuCreacion = rsta.nombre;
        });

        for (let i = 0; i < resp[0].usuarios_asignados.length; i++){
          this.recursoService.getRecursoUnit(resp[0].usuarios_asignados[i])
          .subscribe((rsta: any) => {
            this.nombres.push(" " + rsta.nombre);
          });
        };
      });
      // ------.---------
      } else if (this.usuario.tipo === 'B' && this.usuario.asignados_tarea.indexOf(parseInt(this.paramId)) !== -1) {
        // ------.---------
        this.tarea = this.tareaService.getTarea(this.paramId);
        this.comentario = this.tareaService.getComentarioTarea(this.paramId)
        this.tareaService.getComentarioTarea(this.paramId)
          .subscribe((resp: any) => {
            if (resp.length > 0) {
              this.recursoService.getRecursoUnit(resp[0].usuario)
                .subscribe((rsta: any) => {
                  this.usuComentario = rsta.nombre;
                });
            };
          });

        this.tareaService.getTarea(this.paramId)
          .subscribe((resp: any) => {
            this.proyectoService.getProyecto(resp[0].proyecto)
              .subscribe((res: any) => {
                this.breadcrumb(res);
              });

            this.recursoService.getRecursoUnit(resp[0].usuario_creacion)
              .subscribe((rsta: any) => {
                this.usuCreacion = rsta.nombre;
              });

            for (let i = 0; i < resp[0].usuarios_asignados.length; i++) {
              this.recursoService.getRecursoUnit(resp[0].usuarios_asignados[i])
                .subscribe((rsta: any) => {
                  this.nombres.push(" " + rsta.nombre);
                });
            };
          });
      // ------.---------
      } else if (this.usuario.tipo === 'C' && this.usuario.asignados_tarea.indexOf(parseInt(this.paramId)) !== -1) {
        // ------.---------
        this.tarea = this.tareaService.getTarea(this.paramId);
        this.comentario = this.tareaService.getComentarioTarea(this.paramId)
        this.tareaService.getComentarioTarea(this.paramId)
          .subscribe((resp: any) => {
            if (resp.length > 0) {
              this.recursoService.getRecursoUnit(resp[0].usuario)
                .subscribe((rsta: any) => {
                  this.usuComentario = rsta.nombre;
                });
            };
          });

        this.tareaService.getTarea(this.paramId)
          .subscribe((resp: any) => {
            this.proyectoService.getProyecto(resp[0].proyecto)
              .subscribe((res: any) => {
                this.breadcrumb(res);
              });

            this.recursoService.getRecursoUnit(resp[0].usuario_creacion)
              .subscribe((rsta: any) => {
                this.usuCreacion = rsta.nombre;
              });

            for (let i = 0; i < resp[0].usuarios_asignados.length; i++) {
              this.recursoService.getRecursoUnit(resp[0].usuarios_asignados[i])
                .subscribe((rsta: any) => {
                  this.nombres.push(" " + rsta.nombre);
                });
            };
          });
      // ------.---------
      }else{
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  breadcrumb(res){
    this.breadcrumbs = [{
      titulo: 'Proyecto: ',
      nombre: res[0].nombre,
      urlNombre: '/proyecto',
      id: res[0].id,
      titulo1: 'Proyectos',
      urlTitulo1: '/proyectos',
      subtitulo: 'Tareas',
      urlSubtitulo: '/tareas',
      subId: res[0].id,
      subtitulo1: 'Detalle de Tarea',
    }];
  }
  nuevoComentario(texto){
    this.comentTexto = texto;
    return texto;
  }

  textoEditado(texto){
    this.comentEdit = texto;
  }

  guardarComentario(){
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    this.comentario.texto = this.comentTexto;
    this.comentario.usuario = this.usuario.id;
    this.comentario.tarea = this.tareaId;

    peticion = this.tareaService.crearComentario(this.comentario);

    peticion.subscribe(resp => {
      Swal.fire({
        text: 'Se creó correctamente',
        icon: 'success'
      });
      this.getTarea();
    });
  }

  idComent(id){
    this.idComentario = id
    return this.idComentario
  }

  editarComentario(id){
    var texto = {"texto": this.comentEdit}
    console.log(texto)
    console.log(id)
    console.log("algo")
    this.tareaService.editarComentario(id, texto)
    .subscribe(data => {
      Swal.fire({
        text: 'Se editó correctamente',
        icon: 'success'
      })
      this.getTarea()
    },
    error => console.log(error));
  }

  borrarComentario(id){
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que desea eliminar este comentario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    })
    .then(resultado => {
      if (resultado.value) {
        this.tareaService.eliminarComentario(id)
        .subscribe(res => {
          this.getTarea();
        });
      }
    });
  }

  finalizarTarea(tareaId){
    var data = {'estado': 'F'};
    this.tareaService.finalizarTarea(tareaId, data)
    .subscribe(data => {
      Swal.fire({
        title: this.tarea.nombre,
        text: 'Finalizada',
        icon: 'success'
      })
      this.getTarea()
    }),
    error => console.log(error);
  }
}
