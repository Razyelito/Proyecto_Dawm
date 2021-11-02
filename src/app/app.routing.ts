import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { NoticiasComponent } from './noticias/noticias.component';
import { EventosComponent } from './eventos/eventos.component';
import { TalleresComponent } from './talleres/talleres.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { QuienessomosComponent } from './quienessomos/quienessomos.component';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    

    { path: 'noticias',             component: NoticiasComponent },
    { path: 'eventos',     component: EventosComponent },
    { path: 'talleres',           component: TalleresComponent },
    { path: 'contactenos',          component: ContactenosComponent },
    { path: 'quienessomos',          component: QuienessomosComponent },
    { path: '', redirectTo: 'noticias', pathMatch: 'full' }

  ];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
