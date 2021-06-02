import { ProyectoModel } from './../../models/proyecto.models';
import { ProyectoService } from './../../services/proyecto/proyecto.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  proyectos: ProyectoModel[] = [];
  recurso: any;
  url = environment.apiUrl + '/media/';

  // tslint:disable-next-line: max-line-length
  constructor( private auth: AuthService, private router: Router, private proyectoservice: ProyectoService ) {
    this.recurso = this.auth.recurso;

  }

  ngOnInit(): void {
    this.mostrarProyectos();
  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }


  mostrarProyectos(){
    if (this.recurso.tipo === 'A') {
      this.proyectoservice.getProyectoEstadoUser('A')
        .subscribe((res: any) => {
          this.proyectos = res;
        });
    } else {
      this.proyectoservice.getProyectoEstadoUser('A', this.recurso.id)
        .subscribe((res: any) => {
          this.proyectos = res;
        });
    }

}

}
