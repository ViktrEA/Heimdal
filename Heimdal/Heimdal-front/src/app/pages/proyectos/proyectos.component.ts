import { ProyectoModel } from './../../models/proyecto.models';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styles: [
  ],
})
export class ProyectosComponent implements OnInit {

  proyectos: ProyectoModel; 

  constructor(private auth:AuthService) { 
    this.getProyectos();
  }
  getProyectos = () => {
    this.auth.getAllProyectos().subscribe(
      data => {
        this.proyectos = data;
      },
      error => {
        console.log(error);
      } 
    )
  }

  ngOnInit(): void {
  }

}
