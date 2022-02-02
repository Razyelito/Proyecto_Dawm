import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Taller } from '../interface/taller.interface';
import { TalleresService } from '../servicios/talleres.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})
export class TalleresComponent implements OnInit {
  talleres!: Taller[];
  talleresMostrar!: Taller[];

  //En el constructor deifinimos tallerSvc de tipo NoticiasService
  constructor(private tallerSvc:TalleresService) { }

  ngOnInit(): void {
    //tap deprecated res=> console.log(res)
    //new  {next: res=> console.log(res) , error: ()=>, complete: ()=>   }
    //llamamos al metodo getTaller del servicio  TalleresService
    this.tallerSvc.getTalleres().pipe(
      tap({        
        next: (talleres:Taller[])=>this.talleres=talleres, //vamos asignar a nuestro atributo talleres los talleres del servicio
        error: () => console.log("Error") ,
        complete: ()=>this.addDescriptionShort()  //cuando complete llamamos al metodo para agregar una descripcion corta
      })
    ).subscribe();
  }

  addDescriptionShort(){
    for (let taller of this.talleres){
      taller.description_short=taller.description.substring(0,70)+' ...';
    }
    this.talleresMostrar=this.talleres;
  }

  //metodo buscar
  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    this.talleresMostrar=this.filterItems(searchValue);
  }
//funcion permite buscar texto en title
  filterItems(query) {
    return this.talleres.filter(function(el) {
        return el.title_detalle.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
  }

}
