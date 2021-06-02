import { InterceptorService } from './services/interceptors/interceptor.service';
import { RecursoService } from './services/recursos/recurso.service';
import { AuthService } from './services/auth.service';
import { TareaService } from './services/tarea/tarea.service';
import { TiempotareaComponent } from './pages/tareas/tiempotarea/tiempotarea.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { TareasComponent } from './../app/pages/tareas/tareas.component';
import { TareaEditComponent } from './pages/tareas/tarea-edit.component';
import { TareaDetalleComponent } from './pages/tareas/tarea-detalle.component';
import { AgregarTiempoComponent } from './pages/tareas/tiempotarea/agregar-tiempo.component';

import { RecursosComponent } from './pages/recursos/recursos.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PagesComponent } from './pages/pages.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { DetallerecursoComponent } from './pages/recursos/detallerecurso.component';
import { ProyectoDetalleComponent } from './pages/proyectos/proyecto-detalle.component';
import { ProyectoCrearComponent } from './pages/proyectos/proyecto-crear.component';
import { TareaCrearComponent } from './pages/tareas/tarea-crear.component';
import { ActualizarTiempoComponent } from './pages/tareas/tiempotarea/actualizar-tiempo.component';
import { EditarrecursoComponent } from './pages/recursos/editarrecurso.component';
import { CrearrecursoComponent } from './pages/recursos/crearrecurso.component';
import { ActividadComponent } from './pages/recursos/actividad/actividad.component';
import { ProyectoService } from './services/proyecto/proyecto.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ProyectosComponent,
    TareasComponent,
    RecursosComponent,
    LoginComponent,
    SidebarComponent,
    PagesComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
    DetallerecursoComponent,
    TareaDetalleComponent,
    ProyectoDetalleComponent,
    TiempotareaComponent,
    TareaEditComponent,
    ProyectoCrearComponent,
    TareaCrearComponent,
    AgregarTiempoComponent,
    ActualizarTiempoComponent,
    EditarrecursoComponent,
    CrearrecursoComponent,
    EditarrecursoComponent,
    ActividadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
