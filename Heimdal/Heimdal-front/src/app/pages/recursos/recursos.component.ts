import { RecursoModel } from './../../models/recurso.models';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styles: [
  ],
})
export class RecursosComponent implements OnInit {

  recurso: RecursoModel;


  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  
}
