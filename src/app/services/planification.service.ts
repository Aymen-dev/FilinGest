import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanificationService {

  private baseUrl = "http://localhost:8000/api/planification";

  constructor(private http: HttpClient) { }


  getPlans(details: any) {
    return this.http.post(this.baseUrl + '/findStates', details);
  }

}
