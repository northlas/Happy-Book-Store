import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../interface/book';
import { CustomResponse } from '../interface/custom-response';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly apiUrl:String = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  
  books$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/book`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  book$ = (bookId: number) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/book/${bookId}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  categoryBooks$ = (categoryId: number) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/category/${categoryId}/book`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  save$ = (book: Book) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/book/add`, book)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  delete$ = (bookId: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/book/delete/${bookId}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => new Error(`An error occured - Error code: ${error.status}`));
  }
}
