import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  url = "http://localhost:8000/api/personnel";

  constructor(private http: HttpClient) { }

  getListePersonnelBySearchTerm(searchTerm: string) {
    return this.http.get<any>(this.url + '/' + searchTerm);
  }
}
