import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesMarqueService {
  baseUrl="http://localhost:8000/api/marques";

constructor(private http: HttpClient){}

add(marques: any) {
  console.log(marques);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });  
  return this.http.post(`${this.baseUrl}/bulk`,marques, { headers })
}
  getAll() {
    return this.http.get(this.baseUrl);
  }
  modify(marqs:any,id:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });  
    return this.http.patch(`${this.baseUrl}/${id}`,marqs, { headers })
  }
  delete(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}