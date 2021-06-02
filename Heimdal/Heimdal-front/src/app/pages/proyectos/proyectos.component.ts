import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProyectoService } from '../../services/proyecto/proyecto.service';
import { RecursoService } from '../../services/recursos/recurso.service';

import { ProyectoModel } from './../../models/proyecto.models';
import { RecursoModel } from '../../models/recurso.models';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styles: [
  ],
})
export class ProyectosComponent implements OnInit, OnDestroy {
  breadcrumbs: any[] = [];

  private unsubscribe$ = new Subject<void>();
  proyectos = new ProyectoModel();
  recurso = new RecursoModel();
  proyecto;
  estado;

  ProyecSelectEst: number;

  // tslint:disable-next-line: max-line-length
  constructor(private proyectoService: ProyectoService, private recursoService: RecursoService, private router: Router, private auth: AuthService) {
    this.breadcrumbs = [
      {
        titulo: 'Proyectos',
        titulo1: 'Proyectos',
        url: '/proyectos'
      }
    ];
    this.recurso = auth.recurso;
   }

  ngOnInit(): void {
    this.onEstadoSelect('');
  }


  onEstadoSelect(ProyecSelectEst: any): void{
    this.estado = ProyecSelectEst;
    if (this.recurso.tipo === 'A'  ) {
       this.proyecto = this.proyectoService.getProyectoEstadoUser(ProyecSelectEst);
    }
    else{
      this.proyecto = this.proyectoService.getProyectoEstadoUser(ProyecSelectEst, this.recurso.id);
    }

  }
  buscarProyecto(input){

    if (input.length < 3) {
      this.onEstadoSelect(this.estado);

    }
    else{
      this.proyecto = this.proyectoService.buscarProyecto(input);
    }

  }

  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
