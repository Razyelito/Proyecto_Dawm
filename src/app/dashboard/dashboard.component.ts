import { Component, OnInit, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { DynamicHostDirective } from '../directiva/dynamic-host.directive';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { TableroComponent } from './tablero/tablero.component';
import { NoticiasAdminComponent } from './noticias-admin/noticias-admin.component';
import { TokenStorageService } from '../servicios/token-storage.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

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
      if (this.user.rol=='Administrador')   this.showAdminBoard = true;      
    }else{
      this.router.navigate(['/login']); 
    }
  }

  ngOnDestroy(): void {
    document.getElementById("menuNavegacion").hidden=false;
    document.getElementById("menuFooter").hidden=false;
  }  

  mostrarTablero(){    
    const component = this.componentFactoryResolver.resolveComponentFactory(TableroComponent);
    this.dinamycHost.viewContainerRef.clear();
    this.dinamycHost.viewContainerRef.createComponent(component);
  }

  mostrarEstadisticas(){    
    const component = this.componentFactoryResolver.resolveComponentFactory(EstadisticasComponent);
    this.dinamycHost.viewContainerRef.clear();
    this.dinamycHost.viewContainerRef.createComponent(component);
  }

  mostrarNoticiasAdmin(){    
    if (this.showAdminBoard){
      const component = this.componentFactoryResolver.resolveComponentFactory(NoticiasAdminComponent);
      this.dinamycHost.viewContainerRef.clear();
      this.dinamycHost.viewContainerRef.createComponent(component);
    }else{
      swal.fire({
        icon: 'error',
        title: 'Dashboard',
        text: 'No tiene Acceso',
      })
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']); 
  }

}


function DynamicComponent(DynamicComponent: any) {
  throw new Error('Function not implemented.');
}

