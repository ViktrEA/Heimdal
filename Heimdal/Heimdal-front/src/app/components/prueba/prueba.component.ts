import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss'],
  providers: [ApiService]
})
export class PruebaComponent implements OnInit {

  recursos = [];

  constructor(private api:ApiService) { 
    this.getRecursos();
  }
  getRecursos = () => {
    this.api.getAllRecursos().subscribe(
      data => {
        this.recursos = data;
      },
      error => {
        console.log(error);
      } 
    )
  }

  ngOnInit(): void {
  }

}
