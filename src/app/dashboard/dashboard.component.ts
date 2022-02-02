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
  //este me srive para poner los compoenente de forma dinamica
  @ViewChild (DynamicHostDirective) public dinamycHost: DynamicHostDirective;
  //atributo para verificar si esta iniciada la sesion por el token
  isLoggedIn = false;
  //atributo para verificar si es admin
  showAdminBoard = false;
  //atributo para guardar usuario de la sesion
  user;
  

  constructor(private router: Router,private componentFactoryResolver:ComponentFactoryResolver,private tokenStorageService: TokenStorageService){
  }

  ngOnInit(): void {
    //inicia el dashboard oculto el menu navegacion normal y el footer
    document.getElementById("menuNavegacion").hidden=true;
    document.getElementById("menuFooter").hidden=true;  
    //verifico si esta logeado con el token
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {//si esta logueado extraigo los datos del usaurio del token
      this.user = this.tokenStorageService.getUser(); 
    }else{//por falso no tiene permisos redirecciono al login
      this.router.navigate(['/login']); 
      this.ngOnDestroy();
    }    
    if (this.user.rol=='Administrador'){ //verificacion para el rol de administrador sino esconde las opciones
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
  //funcion menu usuarios
  mostrarUsuariosAdmin(){    
    if (this.mostrarMensaje()){
      const component = this.componentFactoryResolver.resolveComponentFactory(UsuariosAdminComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);
    }
  }
  //funcion menu noticias
  mostrarNoticiasAdmin(){    
    if (this.mostrarMensaje()){
      const component = this.componentFactoryResolver.resolveComponentFactory(NoticiasAdminComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);
    }
  }
//funcion menu Talleres
mostrarTalleresAdmin(){    
  if (this.mostrarMensaje()){
    const component = this.componentFactoryResolver.resolveComponentFactory(TalleresAdminComponent);
    this.dinamycHost.viewContainerRef.clear();
    this.dinamycHost.viewContainerRef.createComponent(component);
  }
}
//funcion menu eventos
mostrarEventosAdmin(){    
  if (this.mostrarMensaje()){
    const component = this.componentFactoryResolver.resolveComponentFactory(EventosAdminComponent);
    this.dinamycHost.viewContainerRef.clear();
    this.dinamycHost.viewContainerRef.createComponent(component);
  }
}

  
  //funcion menu estadisticas  
  mostrarEstadisticas(){ 
    if (this.mostrarMensaje()){   
      const component = this.componentFactoryResolver.resolveComponentFactory(EstadisticasComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);
    }
  }
//funcion menu perfil
  mostrarPerfilAdmin(){     
      const component = this.componentFactoryResolver.resolveComponentFactory(PerfilAdminComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);    
  }
//funcion menu reportes
  mostrarReportesAdmin(){ 
    if (this.mostrarMensaje()){   
      const component = this.componentFactoryResolver.resolveComponentFactory(ReportesAdminComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);
    }
  }
  //funcion que finaliza la sesion y redirije al login
  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']); 
  }
  //funcion que por si acaso modifiquen el html con el inspector para ponerle la opcion como no oculta  
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

