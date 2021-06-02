import { RecursoModel } from './../../models/recurso.models';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { RecursoService } from 'src/app/services/recursos/recurso.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styles: [
  ],
})
export class RecursosComponent implements OnInit {

  breadcrumbs: any[] = [];

  recursos: RecursoModel;
  recursoLog = new RecursoModel();

  constructor(private recursoService: RecursoService, private auth: AuthService) {
    this.recursoLog = auth.recurso;
  }

  ngOnInit(): void {
    this.getRecursos();
    this.breadcrumbs = [
      {
        titulo: 'Recursos',
        titulo1: 'Recursos',
      }
    ];

  }


  getRecursos = () => {
    this.recursoService.getAllRecursos()
    .subscribe((data: any) => {
        this.recursos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminarRecurso(id) {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que desea eliminar este recurso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })
    .then(resultado => {
      if (resultado.value) {
        console.log('*Eliminado con éxito*');
        this.recursoService.eliminaRecurso(id).subscribe(data=>{
          Swal.fire({
            title: '',
            text: 'Eliminado con éxito',
            icon: 'success',
          })
          this.getRecursos();
        })
      }
    });
  }

}
