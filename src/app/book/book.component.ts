import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { AppState } from '../interface/app-state';
import { CustomResponse } from '../interface/custom-response';
import { BookService } from '../service/book.service';
import { DataState } from "../enum/data-state.enum";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookState$!: Observable<AppState<CustomResponse>>;
  id!: number;

  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    console.log(this.id);

    this.bookState$ = this.bookService.book$(this.id)
      .pipe(
        map(response => {
          console.log("Yes")
          return { dataState: DataState.LOADED, appData: response }
        }),
        startWith({ dataState: DataState.LOADING}),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, error })
        })
    );
  }

}
