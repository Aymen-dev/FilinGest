import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  url = "http://localhost:8000/api/departements";

  constructor(private http: HttpClient) { }

  getListeDepartements(){
    return this.http.get<any>(this.url);
  }

  add(deps: any) {
    console.log(deps);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });  
    return this.http.post(`${this.url}/bulk`,deps, { headers })
  }

  getAll() {
    return this.http.get(this.url)
  }

  modify(dep:any,id:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });  
    return this.http.patch(`${this.url}/${id}`,dep, { headers })
  }
  delete(id:any){
    return this.http.delete(`${this.url}/${id}`)
  }
}
