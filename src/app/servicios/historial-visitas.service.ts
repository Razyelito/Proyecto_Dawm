import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialVisitasService {

  private apiURL='http://localhost:3001/api2/historial_visitas';  
  
  constructor(private http: HttpClient) { 

  }
  //obtener historial visitas mongo db
  getHistorialVisitas():Observable<any[]>{
      return this.http.get<any[]>(this.apiURL);
  }
}