import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { JuegosComponent } from './juegos/juegos.component'
import { PaisesComponent } from './paises/paises.component'
import { PresentacionComponent } from './presentacion/presentacion.component'
import { UsuariosComponent } from './usuarios/usuarios.component'
import { ReportesComponent } from './reportes/reportes.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'juegos',
    component: JuegosComponent,
  },
  {
    path: 'paises',
    component: PaisesComponent,
  },
  {
    path: 'presentacion',
    component: PresentacionComponent,
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'reportes',
    component: ReportesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
