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
  //atributo noticias de tipo arreglo de la interface noticia
  modalMostrar : NgbModalRef;
  noticias!: Noticia[];
  noticiasMostrar!: Noticia[];  
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

  presentacion={    
    "style.height.px":"0"    
  }

  //En el constructor deifinimos noticiaSvc de tipo NoticiasService
  constructor(private NoticiasService:NoticiasService,private modalService: NgbModal) { }

  ngOnInit(): void {
    //tap deprecated res=> console.log(res)
    //new  {next: res=> console.log(res) , error: ()=>, complete: ()=>   }
    //llamamos al metodo getNoticias del servicio  NoticiasService
    this.cargarNoticias();
    //this.cargarNoticiasFetch();     
  }

  /*cargarNoticiasFetch () {
    fetch('http://localhost:3001/api/noticia')
    .then(texto => texto.json())
    .then((noticias:Noticia[]) =>{
      this.noticias=noticias;
      this.agregarDescripcionCorta();
    })    
  }*/

  cargarNoticias(){    
    this.NoticiasService.getNoticiasEstado().pipe(
      tap({        
        next: (noticias:Noticia[])=>this.noticias=noticias, //vamos asignar a nuestro atributo noticias las noticias del servicio
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
//funcion permite buscar texto en title
  filterItems(query) {
    return this.noticias.filter(function(el) {
        return el.titulo.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })    
  }

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

  openContentMostrar(contentEditar,noticia:Noticia) {
    this.mostarNoticia(noticia);
    this.modalMostrar = this.modalService.open(contentEditar, { windowClass: 'formulario',centered: true })    
    this.modalMostrar.result.then((e) => {      
    });      
  }

  mostarNoticia(noticia){
    this.noticiaTmp=noticia;
  }

  
  cerrarContentMostrar() {    
    this.modalMostrar.close();    
  }

 
}
