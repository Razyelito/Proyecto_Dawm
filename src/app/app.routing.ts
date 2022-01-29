import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { NoticiasComponent } from './noticias/noticias.component';
import { EventosComponent } from './eventos/eventos.component';
import { TalleresComponent } from './talleres/talleres.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { QuienessomosComponent } from './quienessomos/quienessomos.component';
import { DashboardComponent } from './dashboard/dashboard.component';




import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardAccesoGuard } from './guard/dashboard-acceso.guard';

const routes: Routes =[
    { path: 'home',             component: HomeComponent }, 
    { path: 'login',          component: LoginComponent },
    { path: 'noticias',             component: NoticiasComponent },
    { path: 'eventos',     component: EventosComponent },
    { path: 'talleres',           component: TalleresComponent },
    { path: 'contactenos',          component: ContactenosComponent },
    { path: 'quienessomos',          component: QuienessomosComponent },
    { path: 'dashboard',          component: DashboardComponent, canActivate: [DashboardAccesoGuard]},
    

    { path: '', redirectTo: 'home', pathMatch: 'full' }

  ];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
