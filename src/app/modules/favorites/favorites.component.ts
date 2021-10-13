import { Component, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { delay, startWith, tap } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FavoriteModel } from '@core';
import { FavoritesFacade } from './services/favorite.facade';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements AfterViewInit, OnDestroy {

  favorites: FavoriteModel[] = [];
  searchForm: FormControl = this.fb.control('');
  subscriptions: Subscription[] = [];

  constructor(
    public favoritesFacade: FavoritesFacade,
    private fb: FormBuilder
  ) {
  }

  ngAfterViewInit(): void {
    this.getFavorites();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  getFavorites(): void {
    this.favoritesFacade.favorites$
      .pipe(
        startWith([]),
        delay(0),
        tap((favorites: FavoriteModel[]) => this.setFavorites(favorites)),
      ).subscribe();
  }

  setFavorites(favorites: FavoriteModel[] = []): void {
    this.favorites = [...favorites];
  }
  // TODO:
  // searchSub(): void {
  //   const searchSub: Subscription = this.searchForm.valueChanges
  //     .pipe(
  //       filter((value: string) => value.length > 2 || !value),
  //       debounceTime(500),
  //       distinctUntilChanged(),
  //       tap((value: string) => this.setSearch(value)),
  //     ).subscribe();
  //   this.subscriptions.push(searchSub);
  // }

  // setSearch(value: string): void {
  //   if (!value) {
  //     return;
  //   }
  // }

  removeFavorite(favorite: FavoriteModel): void {
    this.favoritesFacade.removeFavorite(favorite);
  }
}
