import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { FavoritesEffects } from './favorites.effects';
import { IFavoritesState } from './favorites.reducer';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  addFavoriteSuccess,
  getFavorites,
  getFavoritesSuccess,
  addFavorite,
  removeFavorite,
  removeFavoriteSuccess
} from './favorites.actions';
import { FavoriteService } from '../../services/favorites/favorite.service';
import { productMockModel } from '../../mocks/product-mock.model';
import { AppFacade } from '../../services/app.facade';
import { TranslateService, TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';


const initialState = {
  data: []
};

describe('FavoritesEffects', () => {
  let actions$: Observable<any>;
  let effects: FavoritesEffects;
  let store: MockStore<IFavoritesState>;
  let favoritesService: FavoriteService;
  let appFacade: AppFacade;
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
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
    appFacade = TestBed.inject(AppFacade);
    translate = TestBed.inject(TranslateService);
  });

  describe('loadFavorites$', () => {
    it('should call favoritesService.favorites and return typed Action', () => {
      const spy: jasmine.Spy =  spyOnProperty(favoritesService, 'favorites', 'get').and.returnValue([ productMockModel ]);
      actions$ = of(getFavorites);
      effects.loadFavorites$.subscribe((res) => {
        expect(res).toEqual(getFavoritesSuccess({ data: [ productMockModel ] }));
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('addFavorite$', () => {
    it('should call favoritesService.addFavorite and return typed Action', () => {
      actions$ = of(addFavorite( { data: []}));
      favoritesService.addFavorite(productMockModel);
      effects.addFavorite$.subscribe((res) => {
        expect(res).toEqual(addFavoriteSuccess({ data: [ productMockModel ] }));
      });
    });
  });

  describe('removeFavorite$', () => {
    it('should call favoritesService.removeFavorite and return typed Action', () => {
      favoritesService.addFavorite(productMockModel);
      actions$ = of(removeFavorite);
      effects.removeFavorite$.subscribe((res) => {
        expect(res).toEqual(removeFavoriteSuccess({ data: [ productMockModel ] }));
      });
    });
  });

  describe('successFavAlert$', () => {
    it('should call translate instant with .added. and successAlert', () => {
      spyOn(translate, 'instant').and.returnValue('translateString');
      spyOn(appFacade, 'successAlert');
      effects.successFavAlert('added')
      expect(translate.instant).toHaveBeenCalledTimes(2);
      expect(translate.instant).toHaveBeenCalledWith('favorites.added.title');
      expect(translate.instant).toHaveBeenCalledWith('favorites.added.text');
      expect(appFacade.successAlert).toHaveBeenCalledWith('translateString', 'translateString');
    });
  });

});
