import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppFacade } from './app.facade';
import { IFavoritesState } from '../state/favorites/favorites.reducer';
import * as fromFavorites from '../state/favorites/favorites.reducer';
import { favoriteMockModel } from './favorites/mocks/favorites-mock.model';
import { addFavorite, removeFavorite } from '../state/favorites/favorites.actions';
import { AlertService } from './alert/alert.service';

describe('AppFacade', () => {
  let service: AppFacade;
  let store: Store<IFavoritesState>;
  let alertService: AlertService;


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
    alertService = TestBed.inject(AlertService);
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

  describe('#successAlert()', () => {
    it('should call alertService.success with title, text', () => {
      const title: string = 'title';
      const text: string = 'text';
      spyOn(alertService, 'success');
      service.successAlert(title, text);
      expect(alertService.success).toHaveBeenCalledWith(title, text);
    });
  });

  describe('#errorAlert()', () => {
    it('should call alertService.error with title, text', () => {
      const title: string = 'title';
      const text: string = 'text';
      spyOn(alertService, 'error');
      service.errorAlert(title, text);
      expect(alertService.error).toHaveBeenCalledWith(title, text);
    });
  });

});
