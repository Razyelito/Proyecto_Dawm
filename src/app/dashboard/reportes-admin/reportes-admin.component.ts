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
  
  isLoggedIn = false;//atributo para saber si esta logueado  
  usuarioSesion;//atributo para los datos del usaurio de la sesion

  usuarios!: Usuario[]; //arreglo usuarios
  categorias!: Categoria[]; //arreglo de categorias
  historialArticulos;//arreglo del historial de articulos

  constructor(private router: Router,
              private UsuariosService:UsuariosService,
              private tokenStorageService: TokenStorageService,
              private HistorialArticulosService: HistorialArticulosService,
              private CategoriasService:CategoriasService) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();//extraigo token de la sesion
    if (this.isLoggedIn) {//si existe el token extraigo los datos del usuario del token
      this.usuarioSesion = this.tokenStorageService.getUser();     
      this.cargarUsuarios();//llamo funcion cargar usuarios
      this.cargarCategorias();//llamo funcion cargar categorias
    }else{//falso cierro la sesion y redirecciono
      this.tokenStorageService.signOut();
      this.router.navigate(['/login']);  
    } 
  } 
  //funcion que permite llenar los usuarios mysql
  cargarUsuarios(){
    this.UsuariosService.getUsuarios().pipe(
      tap({        
        next: (usuarios:Usuario[])=>this.usuarios=usuarios, //vamos asignar a nuestro atributo usuarios los usuarios que me retorne el servicio
        error: () => console.log("Error") ,
        complete: ()=>console.log(this.usuarios)
      })
    ).subscribe();
  }
//funcion que permite llenar las categorias mysql
  cargarCategorias(){
    this.CategoriasService.getCategorias().pipe(
      tap({        
        next: (categorias:Categoria[])=>this.categorias=categorias, //vamos asignar a nuestro atributo categorias las categorias que me retorne el servicio
        error: () => console.log("Error") ,
        complete: ()=>console.log(this.categorias)
      })
    ).subscribe();
  }
  //funcion que es llamada combo usuario y permite llenar el historialArticulos mongodb
  generarTablaUsuario(id_usuario){ 
    if (this.verificarLogin()) {
      this.HistorialArticulosService.getHistorialArticulosUsuario(id_usuario).pipe(
        tap({        
          next: (historialArticulos)=>this.historialArticulos=historialArticulos, //vamos asignar a nuestro atributo historialArticulos los historialArticulos que me retorne el servicio
          error: () => console.log("Error") ,
          complete: ()=>console.log(this.historialArticulos)
        })
      ).subscribe();    
    }
  }
//funcion que es llamada combo categoria y permite llenar el historialArticulos mongodb
  generarTablaCategoria(id_categoria){    
    if (this.verificarLogin()) {
    this.HistorialArticulosService.getHistorialArticulosCategoria(id_categoria).pipe(
      tap({        
        next: (historialArticulos)=>this.historialArticulos=historialArticulos, //vamos asignar a nuestro atributo noticias las noticias del servicio
        error: () => console.log("Error") ,
        complete: ()=>console.log(this.historialArticulos)
      })
    ).subscribe();    
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
}
