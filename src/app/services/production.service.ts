import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendResponse } from '../interfaces/backend-response';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  baseUrl = "http://localhost:8000/api/production";

  constructor(private http: HttpClient) { }

  saveEnteteProduction(formData: any): Observable<BackendResponse> {
    return this.http.post<BackendResponse>(this.baseUrl + '/create', formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422) {
            // Handle validation errors here
            console.error('Validation errors:', error.error);
          } else {
            // Handle other types of errors (e.g., server errors)
            console.error('An error occurred:', error.error.message || error.message);
          }
          return throwError(() => error); // Re-throw the error to propagate it to the caller
        })
      );
  }

  saveDetailsProduction(formData: any): Observable<BackendResponse> {
    return this.http.post<BackendResponse>(this.baseUrl + '/create_details', formData);
  }

  getListeEntetesProduction(): Observable<BackendResponse> {
    return this.http.get<BackendResponse>(this.baseUrl);
  }

  deleteEnteteProductionById(id: number): Observable<BackendResponse> {
    return this.http.delete<BackendResponse>(this.baseUrl + '/' + id);
  }

  getDetailsProductionByEnteteId(id: number): Observable<BackendResponse> {
    return this.http.get<BackendResponse>(this.baseUrl + '/' + id);
  }

  editDetailsProduction(formData: any, id: number): Observable<BackendResponse> {
    return this.http.put<BackendResponse>(this.baseUrl + '/' + id, formData);
  }


}
