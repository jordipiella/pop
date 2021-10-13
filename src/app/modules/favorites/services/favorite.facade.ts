import { Injectable } from '@angular/core';
import { FavoriteModel } from '@core';
import { Observable } from 'rxjs';
import { AppFacade } from '@core';


@Injectable({
  providedIn: 'root'
})
export class FavoritesFacade {

  constructor(
    private appFacade: AppFacade
  ) { }

  addFavorite(favorite: FavoriteModel): void {
    this.appFacade.addFavorite(favorite);
  }

  removeFavorite(favorite: FavoriteModel): void {
    this.appFacade.removeFavorite(favorite);
  }

  get favorites$(): Observable<FavoriteModel[]> {
    return this.appFacade.favorites$;
  }

}
