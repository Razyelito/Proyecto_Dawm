import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../interface/noticia.interface';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  //url de noticias
  //private apiURL='http://localhost:3000/noticias';
  private apiURL='http://localhost:3001/api/noticia';
  
  constructor(private http: HttpClient) { 

  }
  //obtener arreglo noticias de tipo interface noticia
  getNoticias():Observable<Noticia[]>{
      return this.http.get<Noticia[]>(this.apiURL);
  }
  
}
