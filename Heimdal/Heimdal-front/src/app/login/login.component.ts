import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.models';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare function init_plugins();


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioModel();
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    init_plugins();


  }

  login(form: NgForm){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'espere por favor'
    });
    Swal.showLoading();

    this.auth.login( this.usuario)
      .subscribe( resp => {
        Swal.close();
        this.router.navigate(['/dashboard']);
      }, (err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          text: 'ingrese Sus Datos correctamente',
        });
      });


  }

}
