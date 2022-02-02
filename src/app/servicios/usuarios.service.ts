import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiURL='http://localhost:3001/api/usuarios/';
    
  constructor(private http: HttpClient) { 

  }
  //obtener usuarios
  getUsuarios():Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.apiURL);
  }
}
