import { Component, ElementRef, OnInit, TemplateRef, ViewChild ,Renderer2 } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Noticia } from '../../interface/noticia.interface';
import { NoticiasService } from '../../servicios/noticias.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from'sweetalert2'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-noticias-admin',
  templateUrl: './noticias-admin.component.html',
  styleUrls: ['./noticias-admin.component.css']
})
export class NoticiasAdminComponent implements OnInit {  
  modalEditar : NgbModalRef;
  modalNuevo : NgbModalRef;

  id_usuario="1";
  tituloTexto: string = null
  noticias!: Noticia[];
  
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

  noticiaNueva: Noticia={
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
  

  constructor(private NoticiasService:NoticiasService,private modalService: NgbModal) { 
    
  }

  openContentEditar(contentEditar,noticia:Noticia) {
    this.mostarEditarNoticia(noticia);
    this.modalEditar = this.modalService.open(contentEditar, { windowClass: 'formulario',centered: true, backdrop  : 'static',
    keyboard  : false })    
    this.modalEditar.result.then((e) => {      
    });      
  }

  cerrarContentEditar() {    
    this.modalEditar.close();
    this.cargarNoticias();
  }

  openContentNuevo(contentNuevo) {      
    this.modalNuevo = this.modalService.open(contentNuevo, { windowClass: 'formulario',centered: true, backdrop  : 'static',
    keyboard  : false })    
    this.modalNuevo.result.then((e) => {      
    });      
  }

  cerrarContentNuevo() {    
    this.modalNuevo.close();
    this.cargarNoticias();
  }

  ngOnInit(): void {
    this.cargarNoticias();
  }

  clearNoticiaTmp(){
    this.noticiaTmp.id_noticia="";
    this.noticiaTmp.fecha_creacion=new Date();
    this.noticiaTmp.titulo="";
    this.noticiaTmp.descripcion="";
    this.noticiaTmp.fecha_publicacion=new Date();
    this.noticiaTmp.img ="";
    this.noticiaTmp.estado=true;
    this.noticiaTmp.id_usuario="";    
  }

  cargarNoticias(){
    this.NoticiasService.getNoticias().pipe(
      tap({        
        next: (noticias:Noticia[])=>this.noticias=noticias, //vamos asignar a nuestro atributo noticias las noticias del servicio
        error: () => console.log("Error") ,
        complete: ()=> this.mostrarLoading()
      })
    ).subscribe();
  }

  mostrarLoading(){

  }

  cambiarEstadoNoticia(boton){ 
    this.clearNoticiaTmp();
    this.noticiaTmp.id_noticia=boton.value;
    this.noticiaTmp.estado=boton.checked;        
      this.NoticiasService.putNoticiasEstado(this.noticiaTmp).subscribe(() => {
        swal.fire("Noticias", "Actualizado correctamente", 'success');
        this.cargarNoticias();
        });     
  }

  mostarEditarNoticia(noticia:Noticia){      
    this.noticiaTmp=noticia; 
    this.noticiaTmp.fecha_publicacion2=this.noticiaTmp.fecha_publicacion.toString().substring(0,10)
  }

  actualizarNoticia(){    
    this.noticiaTmp.id_usuario="1";
    this.noticiaTmp.fecha_publicacion=new Date( this.noticiaTmp.fecha_publicacion2);
    this.NoticiasService.putNoticias(this.noticiaTmp, this.noticiaTmp.id_noticia).subscribe(() => {
      swal.fire("Noticias", "Actualizado correctamente", 'success');
      this.cerrarContentEditar();
      this.cargarNoticias();
      });
  }

  guardarNoticia(){
    this.noticiaNueva.id_usuario="1";      
    if (this.validarCampos(this.noticiaNueva)){
      this.noticiaNueva.fecha_publicacion=new Date( this.noticiaNueva.fecha_publicacion2);
      this.NoticiasService.postNoticias(this.noticiaNueva).subscribe(() => {
        swal.fire("Noticias", "correctamente", 'success');
        this.cerrarContentNuevo();
        this.cargarNoticias();
        });      
    }
    else{
      swal.fire({
        icon: 'error',
        title: 'Noticias',
        text: 'No puede dejar campos vacios por favor verifique',
      })
    }  

  }


  /*guardarNoticia(form: NgForm){ 
    form.value.id_usuario=1;
    if (form.value.estado==null || form.value.estado=='' || form.value.estado.length==0 ) form.value.estado=true;
    if (this.validarCampos(form)){
      this.NoticiasService.postNoticias(form.value).subscribe(() => {
        swal.fire("Noticias", "correctamente", 'success');
        this.cargarNoticias();
        });
      form.reset();    
    }
    else{
      swal.fire({
        icon: 'error',
        title: 'Noticias',
        text: 'No puede dejar campos vacios por favor verifique',
      })
    }
  }*/

  validarCampos(noticia: Noticia){    
    let bandera=true;
    if (noticia.titulo==null || noticia.titulo=='' || noticia.titulo.length==0) bandera=false;
    if (noticia.descripcion==null || noticia.descripcion=='' || noticia.descripcion.length==0) bandera=false;
    if (noticia.fecha_publicacion2==null || noticia.fecha_publicacion2=='' || noticia.fecha_publicacion2.toString().length==0) bandera=false;
    return bandera;
  }


  eliminarNoticia(id_noticia){        
      this.NoticiasService.deleteNoticias(id_noticia).subscribe(() => {
        swal.fire("Noticias", "Eliminado correctamente", 'success');
        this.cargarNoticias();
        });    
      
  }

}
