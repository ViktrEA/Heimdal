import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecursoService } from 'src/app/services/recursos/recurso.service';
import { RecursoModel } from 'src/app/models/recurso.models';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crearrecurso',
  templateUrl: './crearrecurso.component.html',
  styles: [
  ],
})
export class CrearrecursoComponent implements OnInit {
  breadcrumbs: any[] = [];

  recurso = new RecursoModel();
  subirImg: File;

  constructor(public router: Router, public recservice: RecursoService) {
  }

  ngOnInit(): void {
    this.breadcrumbs = [
      {
        titulo: 'Crear Recurso',
        titulo1: 'Recursos',
        urlTitulo1: '/recursos',
        subtitulo: 'Crear Recurso'
      }
    ]
  }

  cambiarImg(event: any) {
    this.subirImg = event.target.files[0];
  }

  crearRecurso(form: NgForm){
    const formulario = new FormData();
    if (form.invalid){
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    if (this.subirImg != null) {
      formulario.append('imagen', this.subirImg, this.subirImg.name);
    }
    formulario.append('codigo', this.recurso.codigo);
    formulario.append('nombre', this.recurso.nombre);
    formulario.append('primer_apellido', this.recurso.primer_apellido);
    formulario.append('segundo_apellido', this.recurso.segundo_apellido);
    formulario.append('email', this.recurso.email);
    formulario.append('tipo', this.recurso.tipo);
    formulario.append('activo', "true");
    this.recservice.creaRecurso(formulario).subscribe(res => {
      Swal.fire({
        title: this.recurso.nombre,
        text: 'Se creó correctamente',
        icon: 'success'

      });
      this.router.navigate(['/recursos']);
    }, (err) => {
      Swal.fire({
        icon: 'error',
        text: err.error.non_field_errors[0],
      });
      console.log(err.error.non_field_errors[0]);
    });
  }

}
