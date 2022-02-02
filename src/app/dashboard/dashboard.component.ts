import { Component, OnInit, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { DynamicHostDirective } from '../directiva/dynamic-host.directive';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { NoticiasAdminComponent } from './noticias-admin/noticias-admin.component';
import { TokenStorageService } from '../servicios/token-storage.service';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { TalleresAdminComponent } from './talleres-admin/talleres-admin.component';
import { EventosAdminComponent } from './eventos-admin/eventos-admin.component';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { ReportesAdminComponent } from './reportes-admin/reportes-admin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild (DynamicHostDirective) public dinamycHost: DynamicHostDirective;
  isLoggedIn = false;
  showAdminBoard = false;
  user;
  

  constructor(private router: Router,private componentFactoryResolver:ComponentFactoryResolver,private tokenStorageService: TokenStorageService){
  }

  ngOnInit(): void {
    document.getElementById("menuNavegacion").hidden=true;
    document.getElementById("menuFooter").hidden=true;  
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser(); 
    }else{
      this.router.navigate(['/login']); 
    }    
    if (this.user.rol=='Administrador'){ 
      this.showAdminBoard=true;
      document.getElementById("dashboardOpcionUsuario").hidden=false;
      document.getElementById("dashboardOpcionNoticia").hidden=false;
      document.getElementById("dashboardOpcionTaller").hidden=false;
      document.getElementById("dashboardOpcionEvento").hidden=false;
      document.getElementById("dashboardOpcionEstadistica").hidden=false;
      document.getElementById("dashboardOpcionReporte").hidden=false;
    }
    else {
      document.getElementById("dashboardOpcionUsuario").hidden=true; 
      document.getElementById("dashboardOpcionNoticia").hidden=true;
      document.getElementById("dashboardOpcionTaller").hidden=true;
      document.getElementById("dashboardOpcionEvento").hidden=true;
      document.getElementById("dashboardOpcionEstadistica").hidden=true;
      document.getElementById("dashboardOpcionReporte").hidden=true;
    }
  }

  ngOnDestroy(): void {
    document.getElementById("menuNavegacion").hidden=false;
    document.getElementById("menuFooter").hidden=false;
  }   

  mostrarUsuariosAdmin(){    
    if (this.mostrarMensaje()){
      const component = this.componentFactoryResolver.resolveComponentFactory(UsuariosAdminComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);
    }
  }
  
  mostrarNoticiasAdmin(){    
    if (this.mostrarMensaje()){
      const component = this.componentFactoryResolver.resolveComponentFactory(NoticiasAdminComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);
    }
  }

  mostrarTalleresAdmin(){    
    if (this.mostrarMensaje()){
      const component = this.componentFactoryResolver.resolveComponentFactory(TalleresAdminComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);
    }
  }

  mostrarEventosAdmin(){    
    if (this.mostrarMensaje()){
      const component = this.componentFactoryResolver.resolveComponentFactory(EventosAdminComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);
    }
  }
  
  
  mostrarEstadisticas(){ 
    if (this.mostrarMensaje()){   
      const component = this.componentFactoryResolver.resolveComponentFactory(EstadisticasComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);
    }
  }

  mostrarPerfilAdmin(){     
      const component = this.componentFactoryResolver.resolveComponentFactory(PerfilAdminComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);    
  }

  mostrarReportesAdmin(){ 
    if (this.mostrarMensaje()){   
      const component = this.componentFactoryResolver.resolveComponentFactory(ReportesAdminComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']); 
  }
  
  mostrarMensaje(){
    if (!this.showAdminBoard){
      swal.fire({
        icon: 'error',
        title: 'Dashboard',
        text: 'No tiene Acceso',
      })
    }
    return this.showAdminBoard
  }  

}


function DynamicComponent(DynamicComponent: any) {
  throw new Error('Function not implemented.');
}

