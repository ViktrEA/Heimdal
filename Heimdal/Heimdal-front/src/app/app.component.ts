import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  
  input;

  constructor(private apiService: ApiService ){}

  ngOnInit() {
    this.input = {
      username : '',
      password : '',
      email : ''
    };
  };
  registroUsuario(){
    this.apiService.registroNuevoUsuario(this.input).subscribe(
      response => { 
        alert('Usuario '+ this.input.username + ' ha sido creado!')
      },
      error => console.log('error', error)
    );
  };
  onLogin(){
    this.apiService.loginUsuario(this.input).subscribe(
      response => { 
        console.log(response);
        alert('Usuario '+ this.input.username + ' logueado!')
      },
      error => console.log('error', error)
    );
  }
}