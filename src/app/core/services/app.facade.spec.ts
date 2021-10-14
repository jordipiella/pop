import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppFacade } from './app.facade';
import { IFavoritesState } from '../state/favorites/favorites.reducer';
import * as fromFavorites from '../state/favorites/favorites.reducer';
import { favoriteMockModel } from './favorites/mocks/favorites-mock.model';
import { addFavorite, removeFavorite } from '../state/favorites/favorites.actions';

describe('AppFacade', () => {
  let service: AppFacade;
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
    service = TestBed.inject(AppFacade);
    store = TestBed.inject(Store);
  });

  describe('#addFavorite()', () => {
    it('should call should call store.dispatch with addFavorite', () => {
      spyOn(store, 'dispatch');
      service.addFavorite(favoriteMockModel);
      expect(store.dispatch).toHaveBeenCalledWith(addFavorite({ data: [ favoriteMockModel ] }));
    });
  });

  describe('#removeFavorite()', () => {
    it('should call store.dispatch with removeFavorite', () => {
      spyOn(store, 'dispatch');
      service.removeFavorite(favoriteMockModel);
      expect(store.dispatch).toHaveBeenCalledWith(removeFavorite({ data: [ favoriteMockModel ]}));
    });
  });

});
