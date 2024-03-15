import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TitreFilService {

  baseUrl: string = 'http://localhost:8000/api/titres';

  constructor(private http: HttpClient) { }

  getTitresFil(){
    return this.http.get(this.baseUrl);
  }
  
}
