import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
