import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { EventosComponent } from './eventos/eventos.component';
import { TalleresComponent } from './talleres/talleres.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { QuienessomosComponent } from './quienessomos/quienessomos.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { DynamicHostDirective } from './directiva/dynamic-host.directive';

import { ContactenosService } from './servicios/contactenos.service';
import { NoticiasAdminComponent } from './dashboard/noticias-admin/noticias-admin.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { PerfilAdminComponent } from './dashboard/perfil-admin/perfil-admin.component';
import { ReportesAdminComponent } from './dashboard/reportes-admin/reportes-admin.component';
import { TalleresAdminComponent } from './dashboard/talleres-admin/talleres-admin.component';
import { EventosAdminComponent } from './dashboard/eventos-admin/eventos-admin.component';
import { UsuariosAdminComponent } from './dashboard/usuarios-admin/usuarios-admin.component';


@NgModule({
  declarations: [
    AppComponent,        
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    NoticiasComponent,
    EventosComponent,
    TalleresComponent,
    ContactenosComponent,
    QuienessomosComponent,
    DashboardComponent,
    DynamicHostDirective,
    NoticiasAdminComponent,
    PerfilAdminComponent,
    ReportesAdminComponent,
    TalleresAdminComponent,
    EventosAdminComponent,
    UsuariosAdminComponent,    
            
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD3PR3VbtgoHFb0GRVIzDNKp9iDnDY2i8c'    
   })
  ],
  providers: [ContactenosService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent,]
})
export class AppModule { }
