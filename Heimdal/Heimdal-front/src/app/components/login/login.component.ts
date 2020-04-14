import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
  }

  login(form: NgForm){
    if (form.invalid){ return; }

    this.auth.login( this.usuario)
      .subscribe( resp => {
          console.log(localStorage);
          this.router.navigateByUrl('/home');
      }, (err) => {
          console.log(err.error.non_field_errors[0]);
      });
  }

}
