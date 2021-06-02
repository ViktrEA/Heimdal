import { AuthService } from './../../services/auth.service';
import { Component, OnInit , OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { RecursoService } from '../../services/recursos/recurso.service';
import { ProyectoModel } from '../../models/proyecto.models';
import { RecursoModel } from '../../models/recurso.models';

import { NgForm } from '@angular/forms';
import { Observable, pipe } from 'rxjs';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import swal from 'sweetalert2';

@Component({
  selector: 'app-proyecto-detalle',
  templateUrl: './proyecto-detalle.component.html',
})
export class ProyectoDetalleComponent implements OnInit, OnDestroy {

  breadcrumbs: any[] = [];

  private unsubscribe$ = new Subject<void>();
  proyecto = new ProyectoModel();
  proy: ProyectoModel[]; // ver
  recursos = new RecursoModel();
  recurso: RecursoModel [] = [];
  id: any;
  cambioEstado: ProyectoModel;
  mostrar = false;
  usuario: any;
  // tslint:disable-next-line: max-line-length
  constructor(private proyectoService: ProyectoService, private recursoService: RecursoService, private route: ActivatedRoute, private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {

    this.recursoLog();


  }

  recursoLog(){
    this.recursoService.getRecursoUnit(this.auth.recurso.id)
      .subscribe((resp: any) => {
        this.usuario = resp;
        this.mostrarEstado();
        this.getDetalleProyecto();
      });
  }

  getDetalleProyecto(){

    this.recursoService.getAllRecursos()
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((resp: any) => {
      this.recurso = resp;
    });

    this.route.paramMap.subscribe( params => {

      this.id = params.get('id');

      if (this.usuario.tipo === 'A' ) {
        this.proyectoService.getProyecto(this.id)
          .pipe(
            takeUntil(this.unsubscribe$)
          )
          .subscribe(data => {
            this.proyecto = data[0];
            let fechaCreacion = this.proyecto.fecha_creacion.split(':');
            this.proyecto.fecha_creacion = fechaCreacion[0] + ':' + fechaCreacion[1];
            this.breadcrumb(data);

          }, error => console.log(error));
      } else if (this.usuario.tipo === 'B' && this.usuario.asignados_proyecto.indexOf(parseInt(this.id)) !== -1 ){
        this.proyectoService.getProyecto(this.id)
          .pipe(
            takeUntil(this.unsubscribe$)
          )
          .subscribe(data => {
            this.proyecto = data[0];
            let fechaCreacion = this.proyecto.fecha_creacion.split(':');
            this.proyecto.fecha_creacion = fechaCreacion[0] + ':' + fechaCreacion[1];
            this.breadcrumb(data);

          }, error => console.log(error));
      } else if (this.usuario.tipo === 'C' && this.usuario.asignados_proyecto.indexOf(parseInt(this.id)) !== -1 ){
        this.proyectoService.getProyecto(this.id)
          .pipe(
            takeUntil(this.unsubscribe$)
          )
          .subscribe(data => {
            this.proyecto = data[0];
            let fechaCreacion = this.proyecto.fecha_creacion.split(':');
            this.proyecto.fecha_creacion = fechaCreacion[0] + ':' + fechaCreacion[1];
            this.breadcrumb(data);

          }, error => console.log(error));
      }else{
          this.router.navigateByUrl('/proyectos');
      }
    });


  }

  breadcrumb(data){
    this.breadcrumbs = [
      {
        titulo: 'Detalle Proyecto: ',
        nombre: data[0].nombre,
        titulo1: 'Proyectos',
        urlTitulo1: '/proyectos',
        subtitulo: 'Detalle Proyecto',
        subtitulo1: 'Editar Proyecto'
      }
    ];
  }

  mostrarEstado(){
    if (this.usuario.tipo === 'A') {
      this.mostrar = true;
    }

  }
  guardar(form: NgForm){
    if (form.invalid) {
      return;
    }
    swal.fire({
      title: 'Espere',
      text: 'Guardando Informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    swal.showLoading();
    let peticion: Observable<any>;

    if (this.proyecto.id) {
      peticion = this.proyectoService.actualizarProyecto(this.proyecto);
      pipe(
        takeUntil(this.unsubscribe$)
      );
    }
    peticion.subscribe(resp => {
      swal.fire({
       title: this.proyecto.nombre,
       text: 'Se actualizó correctamente',
       icon: 'success'
      });
     });

   }
   cierreProyectoE(proyId){
    this.proyectoService.cierreProyecto(proyId)
     .subscribe(cambio => {
      swal.fire({
        title: this.proyecto.nombre,
        text: 'Finalizado',
        icon: 'success'
      });
      this.getDetalleProyecto();

       });


   }

   ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
   }


}
