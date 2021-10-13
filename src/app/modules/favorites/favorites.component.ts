import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged, startWith, tap } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FavoriteModel } from '@core';
import { FavoritesFacade } from './services/favorite.facade';
import { normalizeDiacritics } from 'src/app/utils/normalize-diacritics';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements AfterViewInit, OnDestroy {

  favorites: FavoriteModel[] = [];
  allFavorites: FavoriteModel[] = [];
  searchForm: FormControl = this.fb.control('');
  subscriptions: Subscription[] = [];

  constructor(
    public favoritesFacade: FavoritesFacade,
    private fb: FormBuilder
  ) {
  }

  ngAfterViewInit(): void {
    this.getFavorites();
    this.searchSub();
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
        tap(() => this.setSearch(this.searchForm.value)),
      ).subscribe();
  }

  setFavorites(favorites: FavoriteModel[] = []): void {
    this.favorites = [...favorites];
    this.allFavorites = [...favorites];
  }

  searchSub(): void {
    const searchSub: Subscription = this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((value: string) => this.setSearch(value)),
      ).subscribe();
    this.subscriptions.push(searchSub);
  }

  setSearch(value: string): void {
    if (!value) {
      this.setFavorites(this.allFavorites);
      return;
    }
    this.favorites = this.filterFavorites(this.allFavorites, value);
  }

  // TODO: Refactor to generic fn to filter arrays
  filterFavorites(favorites: FavoriteModel[] = [], value: string = ''): FavoriteModel[] {
    const normValue: string = normalizeDiacritics(value);
    const regex: RegExp = new RegExp(normValue, 'gi');
    return favorites.filter((x) => {
      const normTitle: string = (x?.title )? normalizeDiacritics(x.title) : '';
      return normTitle.match(regex);
    });
  }

  removeFavorite(favorite: FavoriteModel): void {
    this.favoritesFacade.removeFavorite(favorite);
  }
}
