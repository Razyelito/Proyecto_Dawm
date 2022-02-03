import { Component, ElementRef, OnInit, TemplateRef, ViewChild ,Renderer2 } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Evento } from '../../interface/speakers.interface';
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
  
  nombreTexto: string = null
  eventos!: Evento[];

  eventosTmp: Evento={
    id_expositor:"",
    nombre:"",
    img:"",
    estado:true
  };

  eventoNuevo: Evento={
    id_expositor:"",
    nombre:"",
    img:"",
    estado:true
  };

  constructor(private router: Router,private EventosService:EventosService,private modalService: NgbModal,private tokenStorageService: TokenStorageService) { 
  }

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

  clearEventosTmp(){
    this.eventosTmp.id_expositor="";
    this.eventosTmp.nombre="";
    this.eventosTmp.img ="";
    this.eventosTmp.estado=true;   
  }


  cargarEventos(){
    this.EventosService.getEventos().pipe(
      tap({        
        next: (eventos:Evento[])=>this.eventos=eventos,
        error: () => console.log("Error") ,
        complete: ()=> null
      })
    ).subscribe();
  }

  cambiarEstadoEvento(boton){ 
    if (this.verificarLogin()){  
      this.clearEventosTmp();
      this.eventosTmp.id_expositor=boton.value;
      this.eventosTmp.estado=boton.checked;        
        this.EventosService.putEventosEstado(this.eventosTmp).subscribe(() => {
          swal.fire("Evento", "Actualizado correctamente", 'success');
          this.cargarEventos();
          });
    }
   }

   mostarEditarEvento(evento:Evento){   
    if (this.verificarLogin()){  
      this.eventosTmp=evento; 
      //this.eventosTmp.fecha_publicacion2=this.eventosTmp.fecha_publicacion.toString().substring(0,10)
    }
  }

  actualizarEvento(){  
    if (this.verificarLogin()){    
      this.eventosTmp.id_expositor=this.usuario.id_expositor;
      //this.eventosTmp.fecha_publicacion=new Date( this.eventosTmp.fecha_publicacion2);
      this.EventosService.putEventos(this.eventosTmp, this.eventosTmp.id_expositor).subscribe(() => {
        swal.fire("Evento", "Actualizado correctamente", 'success');
        this.cerrarContentEditar();
        this.cargarEventos();
        });
    }
  }




  guardarEvento(){
    if (this.verificarLogin()){  
      this.eventoNuevo.id_expositor=this.usuario.id_expositor; 
      this.eventoNuevo.img="./assets/img/theme/imagen_no_disponible.jpg";
      if (this.validarCampos(this.eventoNuevo)){
        //this.eventoNuevo.fecha_publicacion=new Date( this.eventoNuevo.fecha_publicacion2);
        this.EventosService.postEventos(this.eventoNuevo).subscribe(() => {
          swal.fire("Evento", "correctamente", 'success');
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
    if (evento.nombre==null || evento.nombre=='' || evento.nombre.length==0) bandera=false;
    return bandera;
  }


  eliminarEvento(id_expositor){        
    if (this.verificarLogin()){  
      this.EventosService.deleteEventos(id_expositor).subscribe(() => {
        swal.fire("Evento", "Eliminado correctamente", 'success');
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
