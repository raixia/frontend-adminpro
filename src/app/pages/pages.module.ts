import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgDropFilesDirective } from '../directives/ng-drop-files.directive';
import { PerfilComponent } from './perfil/perfil.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './matenimientos/usuarios/usuarios.component';
import { ComponentsModule } from '../components/components.module';
@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    DashboardComponent,
    PagesComponent,
    NgDropFilesDirective,
    PerfilComponent,
    UsuariosComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ComponentsModule,

  ],
  exports: [
    ProgressComponent,
    Grafica1Component,
    DashboardComponent,
    PagesComponent,
  ]
  // NG8001: 'router-outlet' is not a known element:
  //1. If 'router-outlet' is an Angular component, then verify that it is part of this module.
  //2. If 'router-outlet' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.

  //11                             <router-outlet></router-outlet>
  /*este error es por que necesita el routermodule el cual necesita renderiza para que el router outlet puede mostar los componentes */

})
export class PagesModule { }
