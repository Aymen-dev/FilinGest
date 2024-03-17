import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendResponse } from '../interfaces/backend-response';


@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  baseUrl = "http://localhost:8000/api/personnel";

  constructor(private http: HttpClient) { }

  getListePersonnel() {
    return this.http.get<BackendResponse>(this.baseUrl);
  }

  getListePersonnelByEquipe(idEquipe: number) {
    return this.http.get<BackendResponse>(this.baseUrl + '/equipe/' + idEquipe);
  }
}
