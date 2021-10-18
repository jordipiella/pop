import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ItemsFacade } from './items.facade';
import { IQueryParams } from 'src/app/items/api';
import { ItemsService } from './items/items.service';
import { itemMockModel } from '../mocks/item-mock.model';
import { ItemModel } from '../models/item.model';
import { ItemsState } from '../state/items.reducer';
import * as fromItems from '../state/items.reducer';
import { getItems, resetStateItems, setFavPropItems } from '../state/items.actions';
import { AppFacade } from '../../core/services/app.facade';
import { productMockModel } from '../../core/mocks/product-mock.model';
import { ProductModel } from '../../core/models/product.model';

describe('ItemsFacade', () => {
  let service: ItemsFacade;
  let store: Store<ItemsState>;
  let appFacade: AppFacade;
  let itemsService: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(fromItems.reducer),
      ],
      providers: [
        FormBuilder
      ]
    });
    service = TestBed.inject(ItemsFacade);
    store = TestBed.inject(Store);
    appFacade = TestBed.inject(AppFacade);
    itemsService = TestBed.inject(ItemsService);
  });

  describe('#getAllItems()', () => {
    it('should call should call store.dispatch with getItems', () => {
      const queryParams: IQueryParams = { _page: 0, _limit: 5 };
      spyOn(store, 'dispatch');
      service.getAllItems(queryParams);
      expect(store.dispatch).toHaveBeenCalledWith(getItems(queryParams));
    });
  });

  describe('#resetStateItems()', () => {
    it('should call store.dispatch with resetStateItems', () => {
      spyOn(store, 'dispatch');
      service.resetStateItems();
      expect(store.dispatch).toHaveBeenCalledWith(resetStateItems());
    });
  });

  describe('#addToFavorite()', () => {
    it('should call appFacade.addFavorite with item', () => {
      spyOn(appFacade, 'addFavorite');
      service.addToFavorite(itemMockModel);
      expect(appFacade.addFavorite).toHaveBeenCalledOnceWith(itemMockModel);
    });
  });

  describe('#removeToFavorite()', () => {
    it('should call appFacade.removeFavorite', () => {
      spyOn(appFacade, 'removeFavorite');
      service.removeToFavorite(itemMockModel);
      expect(appFacade.removeFavorite).toHaveBeenCalledOnceWith(itemMockModel);
    });
  });

  describe('#setFavoriteProp()', () => {
    it('should call should call store.dispatch with setFavPropItems', () => {
      spyOn(store, 'dispatch');
      service.setFavoriteProp([ itemMockModel ]);
      expect(store.dispatch).toHaveBeenCalledWith(setFavPropItems({ data: [ itemMockModel ] }));
    });
  });

  describe('#get favorites$()', () => {
    it('should return Observable<ProductModel>', () => {
      appFacade.favorites$ = of([ productMockModel ]);
      service.favorites$.subscribe((res: ProductModel[]) => expect(res).toEqual([ productMockModel ]));
    });
  });

  describe('#get params()', () => {
    it('should return IQueryParams', () => {
      const params: IQueryParams = { _page: 1, _limit: 5 };
      spyOnProperty(itemsService, 'params', 'get').and.returnValue(params);
      expect(service.params).toEqual(params);
    });
  });

  describe('#set params()', () => {
    it('should set IQueryParams', () => {
      const params: IQueryParams = { _page: 1, _limit: 5 };
      const setSpy: jasmine.Spy = spyOnProperty(itemsService, 'params', 'set');
      service.params = params;
      expect(setSpy).toHaveBeenCalledOnceWith(params);
    });
  });

  describe('#setSort()', () => {
    it('should call itemsService.setSort with sort value', () => {
      spyOn(itemsService, 'setSort');
      service.setSort('title');
      expect(itemsService.setSort).toHaveBeenCalledOnceWith('title');
    });
  });

  describe('#removeSort()', () => {
    it('should call itemsService.removeSort', () => {
      spyOn(itemsService, 'removeSort');
      service.removeSort();
      expect(itemsService.removeSort).toHaveBeenCalledTimes(1);
    });
  });

  describe('#setSearch()', () => {
    it('should call itemsService.setSearch with search value', () => {
      spyOn(itemsService, 'setSearch');
      service.setSearch('search');
      expect(itemsService.setSearch).toHaveBeenCalledOnceWith('search');
    });
  });

  describe('#removeSearch()', () => {
    it('should call itemsService.removeSearch', () => {
      spyOn(itemsService, 'removeSearch');
      service.removeSearch();
      expect(itemsService.removeSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('#resetParams()', () => {
    it('should call itemsService.resetParams', () => {
      spyOn(itemsService, 'resetParams');
      service.resetParams();
      expect(itemsService.resetParams).toHaveBeenCalledTimes(1);
    });
  });

});
