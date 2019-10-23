import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HttpAPIService {

  private apiUrl = environment.serverUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    })
  };

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  searchCodeNumberActivity(query:string, exludedCna:string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/api/code-number-activity/search/?input=${query}&page=1&limit=10&exclude=${exludedCna}`,
    )
      .pipe(
        catchError(this.handleError<any>('/api/code-number-activity'))
      );
  }

  searchByCNA (cna: string, page: number, limit: number = 30){
    return this.http.get<any>(
      `${this.apiUrl}/api/code-number-activity/company/${cna}?page=${page}&limit=${limit}`
    )
      .pipe(
        catchError(this.handleError<any>('/api/code-number-activity/company'))
      );
  }
  

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
