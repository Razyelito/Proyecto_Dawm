import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../interface/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiURL='http://localhost:3001/api/rol/';
    
  constructor(private http: HttpClient) { 

  }
  //obtener usuarios
  getUsuarios():Observable<Rol[]>{
      return this.http.get<Rol[]>(this.apiURL);
  }
}
