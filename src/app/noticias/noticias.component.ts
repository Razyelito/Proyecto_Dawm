import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { Noticia } from '../interface/noticia.interface';
import { NoticiasService } from '../servicios/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],  
})
export class NoticiasComponent implements OnInit {
  //atributo que permite manejar modal para visualizar noticia especifica
  modalMostrar : NgbModalRef;
  //atributo que va almacenar todas las noticias
  noticias!: Noticia[];
  //atributo que va almacenar las noticias a mostrar ya sea todas o por filtro de busqueda
  noticiasMostrar: Noticia[]=[];  
  //atributo que va permitir mostrar en el modal cuando se da click en cada tarjeta
  noticiaTmp: Noticia={
    id_noticia:"",
    fecha_creacion:new Date(),
    titulo:"",
    descripcion:"",
    fecha_publicacion:new Date(),
    img :"",
    estado:true,
    id_usuario:"",
    descripcion_corta:"",
    fecha_publicacion2:""
  };

   //En el constructor deifinimos servcio para comunicar con el api
   //y NgbModal para poder controlar desde aca el modal en el html
  constructor(private NoticiasService:NoticiasService,private modalService: NgbModal) { }

  ngOnInit(): void {    
    //al inicio llamamos a cargar noticias
    this.cargarNoticias();    
  }

  cargarNoticias(){    
    //llamamos al metodo get noticias estado que va recuperar solo las noticias activas para mostrar
    this.NoticiasService.getNoticiasEstado().pipe(
      tap({        
        next: (noticias:Noticia[])=>this.noticias=noticias, //vamos asignar a nuestro atributo noticias las noticias que nos retorne el servicio
        error: () => console.log("Error") ,
        complete: ()=>this.agregarDescripcionCorta()  //cuando complete llamamos al metodo para agregar una descripcion corta
      })
    ).subscribe();    
    
  }

  agregarDescripcionCorta(){
    console.log(this.noticias);
    for (let noticia of this.noticias){
      noticia.descripcion_corta=noticia.descripcion.substring(0,70)+' ...';   
      noticia.fecha_publicacion2=noticia.fecha_publicacion.toString().substring(0,10);
    }    
    this.noticiasMostrar=this.noticias;    
    
  }
  //metodo buscar
  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    this.noticiasMostrar=this.filterItems(searchValue);    
  }
//funcion permite buscar texto en el campo titulo
  filterItems(query) {
    return this.noticias.filter(function(el) {
        return el.titulo.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })    
  }
//funcion que permite que no salga una franja blanca xq se recorta el div cuando la busqueda retorna 1 o nada de items
  getStyles(){
    let myStyles1 = {
      height: '210px',     
    }    
    let myStyles2 = {
      height: '100%',     
    }  
    let myStyles;
    if (this.noticiasMostrar.length<=1) myStyles=myStyles1;
    else myStyles=myStyles2;
    return myStyles;
  }
//funcion para abrir el modal ventanita y se muestre la informacion detallada de la noticia
  openContentMostrar(contentEditar,noticia:Noticia) {
    this.mostarNoticia(noticia);
    this.modalMostrar = this.modalService.open(contentEditar, { windowClass: 'formulario',centered: true })    
    this.modalMostrar.result.then((e) => {      
    });      
  }

  mostarNoticia(noticia){
    this.noticiaTmp=noticia;
  }

  //funcion para cerrar el modal del boton salir sino se hace click en cualquier otro lado y se cierra
  cerrarContentMostrar() {    
    this.modalMostrar.close();    
  }

 
}
