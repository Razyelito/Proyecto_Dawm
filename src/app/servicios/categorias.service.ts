import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiURL='http://localhost:3001/api/categoria/';
  
  
  constructor(private http: HttpClient) { 

  }
  //obtener arreglo noticias de tipo interface noticia
  getCategorias():Observable<any[]>{
      return this.http.get<any[]>(this.apiURL);
  }
}
