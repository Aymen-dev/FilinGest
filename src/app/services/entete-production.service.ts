import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendResponse } from '../interfaces/backend-response';

@Injectable({
  providedIn: 'root'
})
export class EnteteProductionService {

  baseUrl = "http://localhost:8000/api/production";

  constructor(private http: HttpClient) { }

  getEntetesForCurrentMonthByDep(depId: number) {
    return this.http.get<BackendResponse>(this.baseUrl + '/entetes_by_dep_for_curr_month/' + depId)
  }
}
