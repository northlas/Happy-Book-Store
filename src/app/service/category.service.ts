import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interface/category';
import { CustomResponse } from '../interface/custom-response';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly apiUrl:String = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  
  categories$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/category`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  category$ = (categoryId: number) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/category/${categoryId}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  save$ = (category: Category) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/category/add`, category)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  delete$ = (categoryId: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/category/delete/${categoryId}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => new Error(`An error occured - Error code: ${error.status}`));
  }
}
