import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProyectoModel } from '../../models/proyecto.models';
import { RecursoModel } from '../../models/recurso.models';

import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { RecursoService } from '../../services/recursos/recurso.service';

import { Observable } from 'rxjs';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyecto-crear',
  templateUrl: './proyecto-crear.component.html',
  styles: [
  ],
})
export class ProyectoCrearComponent implements OnInit, OnDestroy {

  breadcrumbs: any[] = [];


  private unsubscribe$ = new Subject<void>();
  proyecto = new ProyectoModel();
  recurso: RecursoModel [] = [];
  recursos = new RecursoModel();

  usuario: any;
  mostrar = false;
  cambio = false;

  // tslint:disable-next-line: max-line-length
  constructor(private proyectosService: ProyectoService, private recursosService: RecursoService , private auth: AuthService, private router: Router)  {
    this.usuario = auth.recurso;
  }

  ngOnInit(): void {
    this.mostrarEstado();
    this.recursosService.getAllRecursos()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe((resp: any) => {
    this.recurso = resp;
    });

    this.breadcrumbs = [
      {
        titulo: 'CrearProyecto',
        titulo1: 'Proyectos',
        urlTitulo1: '/proyectos',
        subtitulo: 'Crear Proyecto'
      }
    ];
  }

  mostrarEstado(){
    if (this.usuario.tipo === 'A') {
      this.mostrar = true;
    }

  }
  guardar(form: NgForm){
    this.proyecto.usuario_creacion = this.usuario.id;
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



    peticion = this.proyectosService.crearProyecto(this.proyecto)
     .pipe(
      takeUntil(this.unsubscribe$)
    );

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.proyecto.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
      this.router.navigateByUrl('/proyectos');
    });

  }
  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }



}
