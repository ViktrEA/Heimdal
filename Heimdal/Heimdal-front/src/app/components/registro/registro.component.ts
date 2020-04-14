import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.models';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ],
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService , private router: Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();

  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }
    this.auth.nuevoUsuario( this.usuario)
      .subscribe(resp => {
        console.log(resp);
        this.router.navigateByUrl('/home');
      }, ( err => {
          console.log(err.error.non_field_errors[0]);
      }));

  }

}
