import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../interface/noticia.interface';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  //url de noticias  
  private apiURL='http://localhost:3001/api/noticia/';
  private apiURLEstado='http://localhost:3001/api/noticia/estado';
  private apiURLEstadoActivo='http://localhost:3001/api/noticia/estado/activos';
  
  constructor(private http: HttpClient) { 

  }
  //obtener noticias
  getNoticias():Observable<Noticia[]>{
      return this.http.get<Noticia[]>(this.apiURL);
  }
  //obtener noticia por id
  getNoticiaId(id_noticia):Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.apiURL+id_noticia);  
  }
  //obtener noticia por estado true activos
  getNoticiasEstado():Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.apiURLEstadoActivo);
}
  //post crear noticia
  postNoticias(body){
    return this.http.post(this.apiURL, body);
  }
  //put actualizar de solo el campo estado de una noticia especifica
  putNoticiasEstado(body){
    return this.http.put(this.apiURLEstado, body);
  }
  //put actualizar los campos de noticia por id de noticia
  putNoticias(body,id_noticia){    
    return this.http.put(this.apiURL+id_noticia, body);
  }
  //eliminar noticia
  deleteNoticias(id_noticia){    
    return this.http.delete(this.apiURL+id_noticia);
  }  
}
