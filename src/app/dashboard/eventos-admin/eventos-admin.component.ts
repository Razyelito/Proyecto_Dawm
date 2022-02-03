import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Evento } from '../../interface/speakers';
import { EventosService } from '../../servicios/eventos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2'
import { TokenStorageService } from 'src/app/servicios/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit {
  modalEditar : NgbModalRef;
  modalNuevo : NgbModalRef;
  
  isLoggedIn = false;
  showAdminBoard = false;
  usuario;

  tituloTexto: string = null
  eventos!: Evento[];

  eventosTmp: Evento={
    id_expositor: "",
    name: "",
    img: "",
  };

  eventoNuevo: Evento={
    id_expositor:"",
    name: "",
    img: "",
  };



  constructor(private router: Router,private EventosService:EventosService,private modalService: NgbModal,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.usuario = this.tokenStorageService.getUser();     
      this.cargarEventos();
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


  cleareventosTmp(){
    this.eventosTmp.id_expositor="";
    this.eventosTmp.name="";
    this.eventosTmp.img ="";
  }  

  cargarEventos(){
    this.EventosService.getEventos().pipe(
      tap({        
        next: (eventos:Evento[])=>this.eventos=eventos, //vamos asignar a nuestro atributo noticias las noticias del servicio
        error: () => console.log("Error") ,
        complete: ()=> null
      })
    ).subscribe();
  }

  actualizarEvento(){  
    if (this.verificarLogin()){    
      this.eventosTmp.id_expositor=this.usuario.id_usuario;
      this.EventosService.putEventos(this.eventosTmp, this.eventosTmp.id_expositor).subscribe(() => {
        swal.fire("Noticias", "Actualizado correctamente", 'success');
        this.cerrarContentEditar();
        this.cargarEventos();
        });
    }
  }

  guardarNoticia(){
    if (this.verificarLogin()){  
      this.eventoNuevo.id_expositor=this.usuario.id_usuario; 
      this.eventoNuevo.img="./assets/img/speakers/1.jpg";
      if (this.validarCampos(this.eventoNuevo)){
        this.EventosService.postEventos(this.eventoNuevo).subscribe(() => {
          swal.fire("Noticias", "correctamente", 'success');
          this.cerrarContentNuevo();
          this.cargarEventos();
          });      
      }
      else{
        swal.fire({
          icon: 'error',
          title: 'Eventos',
          text: 'No puede dejar campos vacios por favor verifique',
        })
      }  
    }
  }

  validarCampos(evento: Evento){    
    let bandera=true;
    if (evento.name==null || evento.name=='' || evento.name.length==0) bandera=false;
    return bandera;
  }

  eliminarNoticia(id_expositor){        
    if (this.verificarLogin()){  
      this.EventosService.deleteEventos(id_expositor).subscribe(() => {
        swal.fire("Noticias", "Eliminado correctamente", 'success');
        this.cargarEventos();
        });    
    }      
  }

  openContentEditar(contentEditar,evento:Evento) {
    if (this.verificarLogin()){
      this.mostarEditarEvento(evento);
      this.modalEditar = this.modalService.open(contentEditar, { windowClass: 'formulario',centered: true, backdrop  : 'static',
      keyboard  : false })    
      this.modalEditar.result.then((e) => {      
      });      
    }
  }

  mostarEditarEvento(evento:Evento){   
    if (this.verificarLogin()){  
      this.eventosTmp=evento; 
    }
  }
  cerrarContentEditar() { 
    if (this.verificarLogin()){     
      this.modalEditar.close();
      this.cargarEventos();
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
      this.cargarEventos();
    }
  }

}
