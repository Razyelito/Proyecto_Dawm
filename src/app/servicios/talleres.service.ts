import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Taller } from '../interface/talleres.interface';

@Injectable({
  providedIn: 'root'
})
export class TalleresService {
   //url de talleres
  private apiURL='http://localhost:3000/talleres';

  constructor(private http: HttpClient) { }

  // metodo para obtener talleres
  getTalleres():Observable<Taller[]>{
    return this.http.get<Taller[]>(this.apiURL);
  }

}
