import { AdminGuard } from './guards/admin.guard';
import { ActividadComponent } from './pages/recursos/actividad/actividad.component';
import { ActualizarTiempoComponent } from './pages/tareas/tiempotarea/actualizar-tiempo.component';
import { AgregarTiempoComponent } from './pages/tareas/tiempotarea/agregar-tiempo.component';
import { TiempotareaComponent } from './pages/tareas/tiempotarea/tiempotarea.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ProyectoDetalleComponent } from './pages/proyectos/proyecto-detalle.component';

import { TareasComponent } from './pages/tareas/tareas.component';
import { TareaDetalleComponent } from './pages/tareas/tarea-detalle.component';
import { TareaEditComponent } from './pages/tareas/tarea-edit.component';

import { RecursosComponent } from './pages/recursos/recursos.component';
import { DetallerecursoComponent } from './pages/recursos/detallerecurso.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuardChildService } from './guards/auth-guard-child.service';
import { ProyectoCrearComponent } from './pages/proyectos/proyecto-crear.component';
import { TareaCrearComponent } from './pages/tareas/tarea-crear.component';
import { EditarrecursoComponent } from './pages/recursos/editarrecurso.component';
import { CrearrecursoComponent } from './pages/recursos/crearrecurso.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivateChild: [AuthGuardChildService],
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'proyectos', component: ProyectosComponent},
      { path: 'crearProyecto', component: ProyectoCrearComponent},
      { path: 'proyecto/:id', component: ProyectoDetalleComponent},
      { path: 'tareas', component: TareasComponent},
      { path: 'tareas/:id', component: TareasComponent},
      { path: 'tarea/:id', component: TareaDetalleComponent},
      { path: 'tareacrear/:id', component: TareaCrearComponent},
      { path: 'tareaedit/:id', component: TareaEditComponent},
      { path: 'tiempo_tarea/:id', component: TiempotareaComponent},
      { path: 'add_tiempo/:id', component: AgregarTiempoComponent},
      { path: 'act_tiempo/:id', component: ActualizarTiempoComponent},
      { path: 'recursos', component: RecursosComponent, canActivate: [AdminGuard]},
      { path: 'recurso/:id', component: DetallerecursoComponent},
      { path: 'editarrecurso/:id', component: EditarrecursoComponent},
      { path: 'crearrecurso', component: CrearrecursoComponent, canActivate: [AdminGuard]},
      { path: 'actividad_recurso/:id', component: ActividadComponent},
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
