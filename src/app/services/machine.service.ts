import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BackendResponse } from '../interfaces/backend-response';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  baseUrl = "http://localhost:8000/api/machines";
  
  constructor(private http: HttpClient) { }

  getMachinesByDep(id: number | undefined) {
    return this.http.get<BackendResponse>(this.baseUrl + '/get_by_dep/' + id);
  }

  add(deps: any) {
    console.log(deps);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });  
    return this.http.post(`${this.baseUrl}/bulk`,deps, { headers })
  }
  modify(mach:any,id:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });  
    return this.http.patch(`${this.baseUrl}/${id}`,mach, { headers })
  }
  getAll(){
    return this.http.get(this.baseUrl)
  }
  delete(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
