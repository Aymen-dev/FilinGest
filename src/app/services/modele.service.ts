import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {

  baseUrl="http://localhost:8000/api/modeles";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.baseUrl);
  }
}
