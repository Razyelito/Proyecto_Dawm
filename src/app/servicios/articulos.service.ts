import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../interface/articulo.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  private apiURL='http://localhost:3001/api/articulo/categoria/';

  constructor(private http: HttpClient) { }

  // meotodo que permite obtener articulos por cartegoria
  getArticulosCategoria(id_categoria):Observable<Articulo[]>{
    return this.http.get<Articulo[]>(this.apiURL+id_categoria);
  }

}
