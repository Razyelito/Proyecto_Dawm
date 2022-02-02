import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';
import { Articulo } from '../interface/articulo.interface';
import { ArticulosService } from '../servicios/articulos.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})
export class TalleresComponent implements OnInit {
  modalMostrar : NgbModalRef;
  articulos: Articulo[]=[];  
  articulosMostrar: Articulo[]=[]; 
  articuloTmp: Articulo;

  //En el constructor deifinimos tallerSvc de tipo NoticiasService
  constructor(private ArticulosService:ArticulosService,private modalService: NgbModal) { }

  ngOnInit(): void {
    //tap deprecated res=> console.log(res)
    //new  {next: res=> console.log(res) , error: ()=>, complete: ()=>   }
    //llamamos al metodo getTaller del servicio  TalleresService
    this.ArticulosService.getArticulosCategoria("1").pipe(
      tap({        
        next: (articulos:Articulo[])=>this.articulos=articulos, //vamos asignar a nuestro atributo talleres los talleres del servicio
        error: () => console.log("Error") ,
        complete: ()=>this.addDescriptionShort()  //cuando complete llamamos al metodo para agregar una descripcion corta
      })
    ).subscribe();
  }

  addDescriptionShort(){
    for (let articulo of this.articulos){
      articulo.descripcion_corta=articulo.descripcion.substring(0,60)+' ...';
      articulo.fecha_articulo2=articulo.fecha_articulo.toString().substring(0,10);
    }
    this.articulosMostrar=this.articulos;
  }

  //metodo buscar
  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    this.articulosMostrar=this.filterItems(searchValue);
  }
//funcion permite buscar texto en title
  filterItems(query) {
    return this.articulos.filter(function(el) {
        return el.titulo_detalle.toLowerCase().indexOf(query.toLowerCase()) > -1;
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
    if (this.articulosMostrar.length<=1) myStyles=myStyles1;
    else myStyles=myStyles2;
    return myStyles;
  }

  openContentMostrar(contentEditar,articulo:Articulo) {
    this.mostarNoticia(articulo);
    this.modalMostrar = this.modalService.open(contentEditar, { windowClass: 'formulario',centered: true })    
    this.modalMostrar.result.then((e) => {      
    });      
  }

  mostarNoticia(noticia){
    this.articuloTmp=noticia;
  }

  
  cerrarContentMostrar() {    
    this.modalMostrar.close();    
  }

}
