import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../interface/custom-response';
import { Detail } from '../interface/detail';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private readonly apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  save$ = (detail: Detail) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/detail/add`, detail)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => new Error(`An error occured - Error code: ${error.status}`));
  }
}
