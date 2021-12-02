import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Noticia } from './interface/noticia.interface';
import { NoticiasService } from './services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],  
})
export class NoticiasComponent implements OnInit {
  //atributo noticias de tipo arreglo de la interface noticia
  noticias!: Noticia[];
  noticiasMostrar!: Noticia[];
  filterargs = {title: 'Un'};

  //variable para el servicio NoticiasService
  constructor(private noticiaSvc:NoticiasService) { }

  ngOnInit(): void {
    //tap deprecated res=> console.log(res)
    //new  {next: res=> console.log(res) , error: ()=>, complete: ()=>   }
    //llamamos al metodo getNoticias del servicio  NoticiasService
    this.noticiaSvc.getNoticias().pipe(
      tap({        
        next: (noticias:Noticia[])=>this.noticias=noticias, //vamos asignar a nuestro atributo noticias las noticias del servicio
        error: () => console.log("Error") ,
        complete: ()=>this.addDescriptionSort()  //cuando complete llamamos al metodo para agregar una descripcion corta
      })
    ).subscribe();
  }

  addDescriptionSort(){
    for (let noticia of this.noticias){
      noticia.description_sort=noticia.description.substring(0,70)+' ...';
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
        return el.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
  }

}
