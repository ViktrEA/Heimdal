import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoService } from 'src/app/services/recursos/recurso.service';
import { RecursoModel } from 'src/app/models/recurso.models';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editarrecurso',
  templateUrl: './editarrecurso.component.html',
  styleUrls: []
})
export class EditarrecursoComponent implements OnInit {

  breadcrumbs: any [] = [];

  recurso = new RecursoModel();
  subirImg: File;
  idRecurso;
  recursoLog: any;

  constructor(public route: ActivatedRoute, public router: Router, public recservice: RecursoService, private auth: AuthService) {
    this.recursoLog = this.auth.recurso;
  }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(){
    this.route.paramMap.subscribe(params => {
      this.idRecurso = params.get('id');

      if (this.recursoLog.tipo === 'A') {
        this.recservice.getDetRec(this.idRecurso).subscribe(res => {
          this.recurso = res[0];
          this.breadcrumbs = [
            {
              titulo: 'Editar Perfil: ',
              nombre: res[0].nombre + ' ' + res[0].primer_apellido,
              titulo1: 'Recurso',
              urlTitulo1: '/recursos',
              subtitulo: 'Perfil',
              urlSubtitulo: '/recurso',
              subId: res[0].id,
              subtitulo1: 'Editar Recurso',
              tipo: res[0].tipo
            }
          ];
        });

      } else if (this.recursoLog.tipo === 'C' && this.recursoLog.id === parseInt(this.idRecurso)) {
        this.recservice.getDetRec(this.idRecurso).subscribe(res => {
          this.recurso = res[0];
          this.breadcrumbs = [
            {
              titulo: 'Editar Perfil: ',
              nombre: res[0].nombre + ' ' + res[0].primer_apellido,
              titulo1: 'Recurso',
              urlTitulo1: '/recursos',
              subtitulo: 'Perfil',
              urlSubtitulo: '/recurso',
              subId: res[0].id,
              subtitulo1: 'Editar Recurso',
              tipo: res[0].tipo
            }
          ];
        });

      } else if (this.recursoLog.tipo === 'B' && this.recursoLog.id === parseInt(this.idRecurso)) {
        this.recservice.getDetRec(this.idRecurso).subscribe(res => {
          this.recurso = res[0];
          this.breadcrumbs = [
            {
              titulo: 'Editar Perfil: ',
              nombre: res[0].nombre + ' ' + res[0].primer_apellido,
              titulo1: 'Recurso',
              urlTitulo1: '/recursos',
              subtitulo: 'Perfil',
              urlSubtitulo: '/recurso',
              subId: res[0].id,
              subtitulo1: 'Editar Recurso',
              tipo: res[0].tipo
            }
          ];
        });

      } else {

        this.router.navigate(['/editarrecurso', this.recursoLog.id]);

      }



    });
  }

  cambiarImg(event: any) {
    this.subirImg = event.target.files[0];
  }

  edRecurso(form: NgForm) {
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
    formulario.append('id', this.recurso.id.toString());
    formulario.append('codigo', this.recurso.codigo);
    formulario.append('nombre', this.recurso.nombre);
    formulario.append('primer_apellido', this.recurso.primer_apellido);
    formulario.append('segundo_apellido', this.recurso.segundo_apellido);
    formulario.append('email', this.recurso.email);
    formulario.append('tipo', this.recurso.tipo);
    this.recservice.editarRecurso(formulario).subscribe(res => {
      console.log(res);
      Swal.fire({
        title: this.recurso.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'

      });
      this.router.navigate(['/recurso/' + this.recurso.id]);
    }, (err) => {
      Swal.fire({
        icon: 'error',
        text: err.error.non_field_errors[0],
      });
      console.log(err.error.non_field_errors[0]);
    });
  }

}
