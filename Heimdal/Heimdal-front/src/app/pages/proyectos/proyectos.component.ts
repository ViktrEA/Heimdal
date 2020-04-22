import { ProyectoModel } from './../../models/proyecto.models';
import { Component, OnInit } from '@angular/core';
import { ProyectoService } from './../../services/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styles: [
  ],
})
export class ProyectosComponent implements OnInit {

  proyectos: ProyectoModel;
  proyecto;

  constructor(private proyectoService: ProyectoService ) { }
  ngOnInit(): void {
    this.proyecto = this.proyectoService.getAllProyecto();
  }

}
