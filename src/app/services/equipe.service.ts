import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {


  url = "http://localhost:8000/api/equipes";

  constructor(private http: HttpClient) { }

  getListeEquipes(){
    return this.http.get<any>(this.url);
  }


}
