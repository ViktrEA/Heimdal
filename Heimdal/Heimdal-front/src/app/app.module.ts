import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProyectosComponent,
    RecursosComponent,
    LoginComponent,
    SidebarComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
