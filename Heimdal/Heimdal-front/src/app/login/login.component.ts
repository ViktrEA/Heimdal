import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.models';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
  }

  login(form: NgForm){
    if (form.invalid){ return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'espere por favor'
    });
    Swal.showLoading();

    this.auth.login( this.usuario)
      .subscribe( resp => {
        Swal.close();
          console.log(localStorage);
          this.router.navigateByUrl('/home');
      }, (err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          text: err.error.non_field_errors[0],
        });
          console.log(err.error.non_field_errors[0]);
      });
  }

}
