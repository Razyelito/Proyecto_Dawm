import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { Evento } from '../interface/speakers';
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
    id_expositor: "",
    name: "",
    img: "",
   
  };

  constructor(private EventosService:EventosService,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.cargarSpeaker();
  }

  cargarSpeaker(){
      tap({        
        next: (eventos:Evento[])=>this.eventos=eventos, //vamos asignar a nuestro atributo Eventos las Eventos del servicio
        error: () => console.log("Error") ,
      })
    
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
