import { Component, OnInit, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { DynamicHostDirective } from '../directiva/dynamic-host.directive';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { TableroComponent } from './tablero/tablero.component';
import { NoticiasAdminComponent } from './noticias-admin/noticias-admin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild (DynamicHostDirective) public dinamycHost: DynamicHostDirective;

  constructor(private componentFactoryResolver:ComponentFactoryResolver){
  }

  ngOnInit(): void {
    document.getElementById("menuNavegacion").hidden=true;
    document.getElementById("menuFooter").hidden=true;  
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
    const component = this.componentFactoryResolver.resolveComponentFactory(NoticiasAdminComponent);
    this.dinamycHost.viewContainerRef.clear();
    this.dinamycHost.viewContainerRef.createComponent(component);
  }


}
function DynamicComponent(DynamicComponent: any) {
  throw new Error('Function not implemented.');
}

