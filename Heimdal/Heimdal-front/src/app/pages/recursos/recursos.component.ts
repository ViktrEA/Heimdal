import { RecursoModel } from './../../models/recurso.models';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styles: [
  ],
})
export class RecursosComponent implements OnInit {

  recursos: RecursoModel;

  constructor(private auth:AuthService) { 
    this.getRecursos();
  }
  getRecursos = () => {
    this.auth.getAllRecursos().subscribe(
      data => {
        console.log(data);
        this.recursos = data;
      },
      error => {
        console.log(error);
      } 
    )
  }

  ngOnInit(): void {
  }

  
}
