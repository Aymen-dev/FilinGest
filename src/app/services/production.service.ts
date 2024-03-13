import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  baseUrl = "http://localhost:8000/api/production";

  constructor(private http: HttpClient) { }

  saveEnteteProduction(formData: any) {
    return this.http.post(this.baseUrl + '/create', formData);
  }

  saveDetailsProduction(formData: any) {
    return this.http.post(this.baseUrl + '/create_details', formData);
  }

  getListeEntetesProduction() {
    return this.http.get(this.baseUrl);
  }

  deleteEnteteProductionById(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  getDetailsProductionByEnteteId(id: number) {
    return this.http.get(this.baseUrl + '/' + id);
  }

  editDetailsProduction(formData: any, id: number) {
    return this.http.put(this.baseUrl + '/' + id, formData);
  }

  
}
