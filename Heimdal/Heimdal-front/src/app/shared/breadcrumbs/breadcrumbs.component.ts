import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})

export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  @Input() items: any[] = [];

  constructor() {}

  ngOnInit(): void {

  }

}
