import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { favoriteMockModel } from '@core';
import { of } from 'rxjs';
import * as fromFavorites from '../../../core/state/favorites/favorites.reducer';
import { FavoritesFacade } from './favorite.facade';
import { AppFacade } from '../../../core/services/app.facade';
import { IFavoritesState } from '../../../core/state/favorites/favorites.reducer';
import { FavoriteModel } from '../../../core/services/favorites/models/favorite.model';

describe('FavoritesFacade', () => {
  let service: FavoritesFacade;
  let appFacade: AppFacade;
  let store: Store<IFavoritesState>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(fromFavorites.reducer),
      ],
      providers: [
      ]
    });
    service = TestBed.inject(FavoritesFacade);
    appFacade = TestBed.inject(AppFacade);
    store = TestBed.inject(Store);
  });

  describe('#addFavorite', () => {
    it('should call appFacade.addFavorite with favorite', () => {
      spyOn(appFacade, 'addFavorite');
      service.addFavorite(favoriteMockModel);
      expect(appFacade.addFavorite).toHaveBeenCalledOnceWith(favoriteMockModel);
    });
  });

  describe('#removeFavorite', () => {
    it('should call appFacade.removeFavorite with favorite', () => {
      spyOn(appFacade, 'removeFavorite');
      service.removeFavorite(favoriteMockModel);
      expect(appFacade.removeFavorite).toHaveBeenCalledOnceWith(favoriteMockModel);
    });
  });

  describe('#favorites$', () => {
    it('should return observable of [favorite]', () => {
      appFacade.favorites$ = of([favoriteMockModel]);
      service.favorites$
      .subscribe((favorites: FavoriteModel[]) => {
        expect(favorites).toEqual([favoriteMockModel]);
      });
    });
  });

});
