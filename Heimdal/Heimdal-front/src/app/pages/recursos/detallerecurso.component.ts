import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../../services/recursos/recurso.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detallerecurso',
  templateUrl: './detallerecurso.component.html',
  styles: [
  ],
})
export class DetallerecursoComponent implements OnInit {

  breadcrumbs: any[] = [];

  idRecurso;
  recurso;
  recursoLog: any;

  constructor(private recursoService: RecursoService, private route: ActivatedRoute, private auth: AuthService, private router: Router ) {
    this.recursoLog = this.auth.recurso;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idRecurso = params.get('id');
      if (this.recursoLog.tipo === 'A'){

        this.recurso = this.recursoService.getDetRec(this.idRecurso);
        this.recursoService.getRecursoUnit(this.idRecurso)
          .subscribe((resp: any) => {
            this.breadcrumbs = [
              {
                titulo: 'Perfil',
                titulo1: 'Recurso',
                urlTitulo1: '/recursos',
                tipo: resp.tipo,
                subtitulo: 'Perfil',
              }
            ];
          });
      } else if (this.recursoLog.tipo === 'C' && this.recursoLog.id === parseInt(this.idRecurso)){
        this.recurso = this.recursoService.getDetRec(this.idRecurso);
        this.recursoService.getRecursoUnit(this.idRecurso)
          .subscribe((resp: any) => {
            this.breadcrumbs = [
              {
                titulo: 'Perfil',
                titulo1: 'Recurso',
                urlTitulo1: '/recursos',
                tipo: resp.tipo,
                subtitulo: 'Perfil',
              }
            ];
          });
      } else if (this.recursoLog.tipo === 'B' && this.recursoLog.id === parseInt(this.idRecurso)){
        this.recurso = this.recursoService.getDetRec(this.idRecurso);
        this.recursoService.getRecursoUnit(this.idRecurso)
          .subscribe((resp: any) => {
            this.breadcrumbs = [
              {
                titulo: 'Perfil',
                titulo1: 'Recurso',
                urlTitulo1: '/recursos',
                tipo: resp.tipo,
                subtitulo: 'Perfil',
              }
            ];
          });
      }else{
        this.router.navigate(['/recurso', this.recursoLog.id]);
      }




    });
  }

}
