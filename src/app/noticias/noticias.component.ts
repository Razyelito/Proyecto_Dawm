import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  noticias!: Noticia[];
  noticiasMostrar!: Noticia[];  

  //En el constructor deifinimos noticiaSvc de tipo NoticiasService
  constructor(private NoticiasService:NoticiasService) { }

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

}
