import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interface/usuario.interface';
import { TokenStorageService } from 'src/app/servicios/token-storage.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { HistorialArticulosService } from 'src/app/servicios/historial-articulos.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { Categoria } from 'src/app/interface/categoria.interface';

@Component({
  selector: 'app-reportes-admin',
  templateUrl: './reportes-admin.component.html',
  styleUrls: ['./reportes-admin.component.css']
})
export class ReportesAdminComponent implements OnInit {

  isLoggedIn = false;
  showAdminBoard = false;
  usuarioSesion;

  usuarios!: Usuario[];
  categorias!: Categoria[];
  historialArticulos;

  constructor(private router: Router,
              private UsuariosService:UsuariosService,
              private tokenStorageService: TokenStorageService,
              private HistorialArticulosService: HistorialArticulosService,
              private CategoriasService:CategoriasService) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.usuarioSesion = this.tokenStorageService.getUser();     
      this.cargarUsuarios();
      this.cargarCategorias();
    }else{
      this.tokenStorageService.signOut();
      this.router.navigate(['/login']);  
    } 
  }

  verificarLogin(){
    let bandera=false;
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      bandera=true;
    }else{
      this.tokenStorageService.signOut();
      this.router.navigate(['/login']);  
    }
    return bandera;
  }

  cargarUsuarios(){
    this.UsuariosService.getUsuarios().pipe(
      tap({        
        next: (usuarios:Usuario[])=>this.usuarios=usuarios, //vamos asignar a nuestro atributo noticias las noticias del servicio
        error: () => console.log("Error") ,
        complete: ()=>console.log(this.usuarios)
      })
    ).subscribe();
  }

  cargarCategorias(){
    this.CategoriasService.getCategorias().pipe(
      tap({        
        next: (categorias:Categoria[])=>this.categorias=categorias, //vamos asignar a nuestro atributo noticias las noticias del servicio
        error: () => console.log("Error") ,
        complete: ()=>console.log(this.categorias)
      })
    ).subscribe();
  }
  
  generarTablaUsuario(id_usuario){    
      this.HistorialArticulosService.getHistorialArticulosUsuario(id_usuario).pipe(
        tap({        
          next: (historialArticulos)=>this.historialArticulos=historialArticulos, //vamos asignar a nuestro atributo noticias las noticias del servicio
          error: () => console.log("Error") ,
          complete: ()=>console.log(this.historialArticulos)
        })
      ).subscribe();    
  }

  generarTablaCategoria(id_categoria){    
    this.HistorialArticulosService.getHistorialArticulosCategoria(id_categoria).pipe(
      tap({        
        next: (historialArticulos)=>this.historialArticulos=historialArticulos, //vamos asignar a nuestro atributo noticias las noticias del servicio
        error: () => console.log("Error") ,
        complete: ()=>console.log(this.historialArticulos)
      })
    ).subscribe();    
}
}
