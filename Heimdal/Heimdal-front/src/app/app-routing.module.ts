import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { RecursosComponent } from './pages/recursos/recursos.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
      { path: 'proyectos', component: ProyectosComponent, canActivate: [AuthGuard] },
      { path: 'recursos', component: RecursosComponent, canActivate: [AuthGuard] },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
