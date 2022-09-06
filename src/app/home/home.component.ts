import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { AppState } from '../interface/app-state';
import { CustomResponse } from '../interface/custom-response';
import { BookService } from '../service/book.service';
import { CategoryService } from '../service/category.service';
import { DataState } from "../enum/data-state.enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookState$!: Observable<AppState<CustomResponse>>;
  page!: number;
  pageSize = 5;
  collectionSize!: number;

  constructor(private categoryService: CategoryService, private bookService: BookService) { }

  ngOnInit(): void {
    this.bookState$ = this.bookService.books$
      .pipe(
        map(response => {
          if (response.data.books) {
            this.page = 1;
            this.collectionSize = response.data.books?.length * (10/this.pageSize);
          }
          return { dataState: DataState.LOADED, appData: response }
        }),
        startWith({ dataState: DataState.LOADING}),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, error })
        })
    );
  }

}
