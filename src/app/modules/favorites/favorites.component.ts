import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged, filter, startWith, tap } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FavoriteModel, favoriteMockModel } from '@core';
import { FavoritesFacade } from './services/favorite.facade';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements AfterViewInit {

  favorites: FavoriteModel[] = [];
  subscriptions: Subscription[] = [];

  searchForm: FormControl = this.fb.control('');

  constructor(
    public favoritesFacade: FavoritesFacade,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    console.log(this.favorites);
    this.cdr.detach();
  }

  ngAfterViewInit(): void {
    console.log('Favorite Module');
    this.favoritesFacade.favorites$
    .pipe(
      startWith([]),
      delay(0),
      tap(x => console.log(x)),
      tap(x => this.favorites = x),
      tap(() => this.cdr.detectChanges())

    )
    .subscribe();
    this.favoritesFacade.addFavorite(favoriteMockModel);
    this.favoritesFacade.addFavorite(favoriteMockModel);
    this.favoritesFacade.addFavorite(favoriteMockModel);
    this.favoritesFacade.addFavorite(favoriteMockModel);
    this.cdr.detectChanges();
  }

  searchSub(): void {
    const searchSub: Subscription = this.searchForm.valueChanges
      .pipe(
        filter((value: string) => value.length > 2 || !value),
        debounceTime(500),
        distinctUntilChanged(),
        tap((value: string) => this.setSearch(value)),
      ).subscribe();
    this.subscriptions.push(searchSub);
  }

  setSearch(value: string): void {
    if (!value) {
      return;
    }
  }

  removeFavorite(favorite: FavoriteModel): void {
    this.favoritesFacade.removeFavorite(favorite);
  }
}
