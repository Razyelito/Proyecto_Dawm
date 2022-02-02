import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL='http://localhost:3001/api/login';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  //funcion que permite enviar para verificar el login  
  login(login): Observable<any> {
    return this.http.post(this.apiURL, {
      correo: login.correo,
      clave: login.clave
    }, this.httpOptions);
  }

}
