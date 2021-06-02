import { environment } from './../../../environments/environment';
import { RecursoModel } from './../../models/recurso.models';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ],
})
export class HeaderComponent implements OnInit {

  recurso = new RecursoModel();
  url = environment.apiUrl + '/media/';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.recurso = this.auth.recurso;

  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

}
