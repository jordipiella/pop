import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { productMockModel } from '@core';
import { of } from 'rxjs';
import * as fromFavorites from '../../../core/state/favorites/favorites.reducer';
import { FavoritesFacade } from './favorite.facade';
import { AppFacade } from '../../../core/services/app.facade';
import { IFavoritesState } from '../../../core/state/favorites/favorites.reducer';
import { ProductModel } from '../../../core/models/product.model';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('FavoritesFacade', () => {
  let service: FavoritesFacade;
  let appFacade: AppFacade;
  let store: Store<IFavoritesState>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(fromFavorites.reducer),
        TranslateModule.forRoot()
      ],
      providers: [
        FormBuilder
      ]
    });
    service = TestBed.inject(FavoritesFacade);
    appFacade = TestBed.inject(AppFacade);
    store = TestBed.inject(Store);
  });

  describe('#addFavorite', () => {
    it('should call appFacade.addFavorite with favorite', () => {
      spyOn(appFacade, 'addFavorite');
      service.addFavorite(productMockModel);
      expect(appFacade.addFavorite).toHaveBeenCalledOnceWith(productMockModel);
    });
  });

  describe('#removeFavorite', () => {
    it('should call appFacade.removeFavorite with favorite', () => {
      spyOn(appFacade, 'removeFavorite');
      service.removeFavorite(productMockModel);
      expect(appFacade.removeFavorite).toHaveBeenCalledOnceWith(productMockModel);
    });
  });

  describe('#favorites$', () => {
    it('should return observable of [favorite]', () => {
      appFacade.favorites$ = of([productMockModel]);
      service.favorites$
      .subscribe((favorites: ProductModel[]) => {
        expect(favorites).toEqual([productMockModel]);
      });
    });
  });

});
