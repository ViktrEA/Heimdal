import { AuthService } from './../../services/auth.service';
import { RecursoModel } from './../../models/recurso.models';
import { RecursoService } from './../../services/recursos/recurso.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ],
})
export class DashboardComponent implements OnInit {

  recurso = new RecursoModel();
  breadcrumbs: any [] = [];


  constructor( private recursoService: RecursoService, private auth: AuthService ) {
    this.recurso = this.auth.recurso;
   }

  ngOnInit(): void {

  }

}
