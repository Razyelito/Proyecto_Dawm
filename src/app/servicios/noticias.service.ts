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
  private apiURL='http://localhost:3001/api/noticia/';
  private apiURLEstado='http://localhost:3001/api/noticia/estado';
  private apiURLEstadoActivo='http://localhost:3001/api/noticia/estado/activos';
  
  constructor(private http: HttpClient) { 

  }
  //obtener arreglo noticias de tipo interface noticia
  getNoticias():Observable<Noticia[]>{
      return this.http.get<Noticia[]>(this.apiURL);
  }

  getNoticiaId(id_noticia):Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.apiURL+id_noticia);
}

  getNoticiasEstado():Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.apiURLEstadoActivo);
}

  postNoticias(body){
    return this.http.post(this.apiURL, body);
  }

  putNoticiasEstado(body){
    return this.http.put(this.apiURLEstado, body);
  }
  putNoticias(body,id_noticia){    
    return this.http.put(this.apiURL+id_noticia, body);
  }
  
  deleteNoticias(id_noticia){    
    return this.http.delete(this.apiURL+id_noticia);
  }  
}
