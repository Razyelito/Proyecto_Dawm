import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { Evento } from '../interface/speakers.interface';
import { EventosService } from '../servicios/eventos.service';



@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  modalMostrar : NgbModalRef;

  eventos!: Evento[];

  eventosMostrar: Evento[]=[];  

  eventosTmp: Evento={
    id_expositor:"",
    nombre:"",
    img:"",
    estado:true
  };

  constructor(private EventosService:EventosService,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.cargarSpeaker();
  }

  cargarSpeaker(){    
    //llamamos al metodo get noticias estado que va recuperar solo las noticias activas para mostrar
    this.EventosService.getEventosEstado().pipe(
      tap({        
        next: (eventos:Evento[])=>this.eventos=eventos, //vamos asignar a nuestro atributo noticias las noticias que nos retorne el servicio
        error: () => console.log("Error") ,
        complete: ()=>this.agregarDescripcionCorta()  //cuando complete llamamos al metodo para agregar una descripcion corta

      })
    ).subscribe();    
    
  }

  agregarDescripcionCorta(){
    console.log(this.eventos);
    this.eventosMostrar=this.eventos;    
    
  }

  openContentMostrar(contentEditar,evento:Evento) {
    this.mostarEvento(evento);
    this.modalMostrar = this.modalService.open(contentEditar, { windowClass: 'formulario',centered: true })    
    this.modalMostrar.result.then((e) => {      
    });      
  }
  
  mostarEvento(evento){
    this.eventosTmp=evento;
  }

  cerrarContentMostrar() {    
    this.modalMostrar.close();    
  }
}
