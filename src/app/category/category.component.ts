import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from '../enum/data-state.enum';
import { AppState } from '../interface/app-state';
import { CustomResponse } from '../interface/custom-response';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  bookState$!: Observable<AppState<CustomResponse>>;
  id!: number;
  page!: number;
  pageSize = 5;
  collectionSize!: number;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = Number(this.route.snapshot.paramMap.get('id'));

        console.log(this.id);

        this.bookState$ = this.bookService.categoryBooks$(this.id)
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
    );
  }

}
