import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interface/usuario.interface';
import { TokenStorageService } from 'src/app/servicios/token-storage.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {

  modalEditar : NgbModalRef;
  modalNuevo : NgbModalRef;

  isLoggedIn = false;
  showAdminBoard = false;
  usuario;
    
  usuarios: Usuario[]=[];
  
  usuarioTmp: Usuario;
   

  usuarioNuevo: Usuario={
    id_usuario:"",
    nombre: "",
    clave: "",
    correo: "",    
    id_rol: "" ,
    id_rol_rol:{nombre:""}

  };

  constructor(private router: Router,
              private UsuariosService:UsuariosService,
              private modalService: NgbModal,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.usuario = this.tokenStorageService.getUser();     
      this.cargarUsuarios();
    }else{
      this.tokenStorageService.signOut();
      this.router.navigate(['/login']);  
    }    
  }

  cargarUsuarios(){
    this.UsuariosService.getUsuarios().pipe(
      tap({        
        next: (usuarios:Usuario[])=>this.usuarios=usuarios, //vamos asignar a nuestro atributo noticias las noticias del servicio
        error: () => console.log("Error") ,
        complete: ()=> null
      })
    ).subscribe();
  }

  mostarEditarUsuario(usuario:Usuario){   
    if (this.verificarLogin()){  
      this.usuarioTmp=usuario;       
    }
  }


  openContentEditar(contentEditar,usuario:Usuario) {
    if (this.verificarLogin()){
      this.mostarEditarUsuario(usuario);
      this.modalEditar = this.modalService.open(contentEditar, { windowClass: 'formulario',centered: true, backdrop  : 'static',
      keyboard  : false })    
      this.modalEditar.result.then((e) => {      
      });      
    }
  }

  cerrarContentEditar() { 
    if (this.verificarLogin()){     
      this.modalEditar.close();
      this.cargarUsuarios();
    }
  }

  openContentNuevo(contentNuevo) {    
    if (this.verificarLogin()){  
      this.modalNuevo = this.modalService.open(contentNuevo, { windowClass: 'formulario',centered: true, backdrop  : 'static',
      keyboard  : false })    
      this.modalNuevo.result.then((e) => {      
      });      
    }
  }

  cerrarContentNuevo() {  
    if (this.verificarLogin()){    
      this.modalNuevo.close();
      this.cargarUsuarios();
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
