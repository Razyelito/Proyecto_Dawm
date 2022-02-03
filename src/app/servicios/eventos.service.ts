import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../interface/speakers';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private apiURL = 'http://localhost:3001/api/speakers'

  constructor(private http: HttpClient) { }

  getEventos():Observable<Evento[]>{
    return this.http.get<Evento[]>(this.apiURL);
  } 

  getEventoId(id_expositor):Observable<Evento[]>{
    return this.http.get<Evento[]>(this.apiURL+id_expositor);
}


  postEventos(body){
    return this.http.post(this.apiURL, body);
  }

  putEventos(body,id_expositor){    
    return this.http.put(this.apiURL+id_expositor, body);
  }
  
  deleteEventos(id_Evento){    
    return this.http.delete(this.apiURL+id_Evento);
  }  
}

