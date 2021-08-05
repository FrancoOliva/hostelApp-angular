import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';



@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseURL: string = 'https://restcountries.eu/rest/v2/all?fields=name;flag;translations';

  private paises: Pais[] = [];
  
  constructor( private http: HttpClient ) { }

  obtenerPaises(): Observable<Pais[]> {
    
    return this.http.get<Pais[]>(this.baseURL);
    
  }
}
