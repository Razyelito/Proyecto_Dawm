import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialArticulosService {

  private apiURL='http://localhost:3001/api3/historial_articulos_usuario/';  
  private apiURL1='http://localhost:3001/api3/historial_articulos_categoria/';  
  
  constructor(private http: HttpClient) { 

  }
  //obtener arreglo noticias de tipo interface noticia
  getHistorialArticulosUsuario(id_usuario):Observable<any[]>{
      return this.http.get<any[]>(this.apiURL+id_usuario);
  }

  getHistorialArticulosCategoria(id_categoria):Observable<any[]>{
    return this.http.get<any[]>(this.apiURL1+id_categoria);
}
}