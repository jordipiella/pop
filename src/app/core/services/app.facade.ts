import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FavoriteModel } from './favorites/models/favorite.model';
import { addFavorite, removeFavorite } from '../state/favorites/favorites.actions';
import { IFavoritesState } from '../state/favorites/favorites.reducer';
import { selectFavorites } from '../state/favorites/favorites.selector';
import { AlertService } from './alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  favorites$: Observable<FavoriteModel[]> = this.store.pipe(select(selectFavorites));

  constructor(
    private store: Store<IFavoritesState>,
    private alertService: AlertService
  ) { }

  // Favorites
  addFavorite(favorite: FavoriteModel): void {
    this.store.dispatch(addFavorite({ data: [favorite] }));
  }

  removeFavorite(favorite: FavoriteModel): void {
    this.store.dispatch(removeFavorite({ data: [favorite] } ));
  }

  // Alerts
  successAlert(title: string, text: string): void {
    this.alertService.success(title, text);
  }

  errorAlert(title: string, text: string): void {
    this.alertService.error(title, text);
  }

}
