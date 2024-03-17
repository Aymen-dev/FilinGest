import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendResponse } from '../interfaces/backend-response';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  baseUrl = "http://localhost:8000/api/departements";

  constructor(private http: HttpClient) { }

  getListeDepartements(){
    return this.http.get<BackendResponse>(this.baseUrl);
  }

  getDepartementById(idDep: number){
    return this.http.get<BackendResponse>(this.baseUrl + '/' + idDep);
  }

  add(deps: any) {
    console.log(deps);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });  
    return this.http.post(`${this.baseUrl}/bulk`,deps, { headers })
  }

  getAll() {
    return this.http.get(this.baseUrl)
  }

  modify(dep:any,id:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });  
    return this.http.patch(`${this.baseUrl}/${id}`,dep, { headers })
  }
  delete(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
