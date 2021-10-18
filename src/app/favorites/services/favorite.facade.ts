import { Injectable } from '@angular/core';
import { ProductModel } from '@core';
import { Observable } from 'rxjs';
import { AppFacade } from '@core';


@Injectable({
  providedIn: 'root'
})
export class FavoritesFacade {

  constructor(
    private appFacade: AppFacade
  ) { }

  addFavorite(favorite: ProductModel): void {
    this.appFacade.addFavorite(favorite);
  }

  removeFavorite(favorite: ProductModel): void {
    this.appFacade.removeFavorite(favorite);
  }

  get favorites$(): Observable<ProductModel[]> {
    return this.appFacade.favorites$;
  }

}
