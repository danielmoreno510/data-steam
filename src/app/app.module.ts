import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { JuegosComponent } from './juegos/juegos.component';
import { PaisesComponent } from './paises/paises.component';
import { PresentacionComponent } from './presentacion/presentacion.component';

import { ServicesService } from './services/services.service';
import { AppGlobals } from './services/global';
import { ReportesComponent } from './reportes/reportes.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuariosComponent,
    JuegosComponent,
    PaisesComponent,
    PresentacionComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    ServicesService,
    AppGlobals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
