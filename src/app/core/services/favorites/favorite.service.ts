import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FavoriteModel } from './models/favorite.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private _favoritesSubject: BehaviorSubject<FavoriteModel[]> = new BehaviorSubject([] as FavoriteModel[]);
  favorites$: Observable<FavoriteModel[]> = this._favoritesSubject.asObservable();

  constructor() {}


  set favorites(value: FavoriteModel[]) {
    this._favoritesSubject.next(value);
  }

  get favorites(): FavoriteModel[] {
    return this._favoritesSubject.value;
  }

  addFavorite(favorite: FavoriteModel): void {
    const favorites: FavoriteModel[] = this._favoritesSubject.value;
    this._favoritesSubject.next([...favorites, favorite]);
  }

  removeFavorite(favorite: FavoriteModel): void {
    const favorites: FavoriteModel[] = this._favoritesSubject.value;
    const filteredFav: FavoriteModel[] = favorites.filter((fav: FavoriteModel) => fav.title !== favorite.title && fav.image !== favorite.image);
    this._favoritesSubject.next(filteredFav);
  }

}
