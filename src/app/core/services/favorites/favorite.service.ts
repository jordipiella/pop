import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private _favoritesSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject([] as ProductModel[]);
  favorites$: Observable<ProductModel[]> = this._favoritesSubject.asObservable();

  constructor() {}


  set favorites(value: ProductModel[]) {
    this._favoritesSubject.next(value);
  }

  get favorites(): ProductModel[] {
    return this._favoritesSubject.value;
  }

  addFavorite(favorite: ProductModel): void {
    const favorites: ProductModel[] = this._favoritesSubject.value;
    this._favoritesSubject.next([...favorites, favorite]);
  }

  removeFavorite(favorite: ProductModel): void {
    const favorites: ProductModel[] = this._favoritesSubject.value;
    const filteredFav: ProductModel[] = favorites.filter((fav: ProductModel) => fav.title !== favorite.title && fav.image !== favorite.image);
    this._favoritesSubject.next(filteredFav);
  }

}
