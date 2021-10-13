import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { FavoritesEffects } from './favorites.effects';
import { IFavoritesState } from './favorites.reducer';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getFavorites, getFavoritesSuccess } from './favorites.actions';
import { FavoriteService } from '../../services/favorites/favorite.service';
import { favoriteMockModel } from '../../services/favorites/mocks/favorites-mock.model';


const initialState = {
  data: []
};

describe('FavoritesEffects', () => {
  let actions$: Observable<any>;
  let effects: FavoritesEffects;
  let store: MockStore<IFavoritesState>;
  let favoritesService: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FavoritesEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });
    effects = TestBed.inject(FavoritesEffects);
    store = TestBed.inject(MockStore);
    favoritesService = TestBed.inject(FavoriteService);
  });

  describe('loadFavorites$', () => {
    it('should call itemService.getAll and return typed Action', () => {
      const spy: jasmine.Spy = spyOnProperty(favoritesService, 'favorites', 'get').and.returnValue(of([favoriteMockModel]));
      actions$ = of(getFavorites);
      effects.loadFavorites$.subscribe((res) => {
        expect(res).toEqual(getFavoritesSuccess({ data: [favoriteMockModel] }));
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

});
