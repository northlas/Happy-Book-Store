import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from './enum/data-state.enum';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { CategoryService } from './service/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  categoryState$!: Observable<AppState<CustomResponse>>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryState$ = this.categoryService.categories$
      .pipe(
        map(response => {
          return { dataState: DataState.LOADED, appData: response }
        }),
        startWith({ dataState: DataState.LOADING}),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, error })
        })
    );
  }
}
