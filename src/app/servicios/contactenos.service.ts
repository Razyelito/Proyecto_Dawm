import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactenosService {

  private apiURL='http://localhost:3001/api/contactenos';

  constructor(private http: HttpClient) { }
  
  //funcion para envio de correo electornico
  enviarFormulario(body) {
    return this.http.post(this.apiURL, body);
  }  
}