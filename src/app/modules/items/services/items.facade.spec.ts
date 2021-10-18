import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemsFacade } from './items.facade';
import { IQueryParams } from '@api';
import { ItemsService } from './items/items.service';
import { itemMockModel } from '../mocks/item-mock.model';
import { ItemModel } from '../models/item.model';
import { ItemsState } from '../state/items.reducer';
import { Store, StoreModule } from '@ngrx/store';
import * as fromItems from '../state/items.reducer';
import { getItems, resetStateItems, setFavPropItems } from '../state/items.actions';
import { AppFacade } from '../../../core/services/app.facade';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { productMockModel } from '../../../core/mocks/product-mock.model';
import { ProductModel } from '../../../core/models/product.model';

const itemRes: ItemModel[] = [
  itemMockModel,
  itemMockModel,
  itemMockModel
];

describe('ItemsFacade', () => {
  let service: ItemsFacade;
  let store: Store<ItemsState>;
  let appFacade: AppFacade;

  const itemService: jasmine.SpyObj<ItemsService> = jasmine.createSpyObj('ItemsService', {
    getAll: of({
      total: 5,
      data: itemRes
    })
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(fromItems.reducer),
      ],
      providers: [
        FormBuilder,
        {
          provide: ItemsService, useValue: itemService
        }
      ]
    });
    service = TestBed.inject(ItemsFacade);
    store = TestBed.inject(Store);
    appFacade = TestBed.inject(AppFacade);
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
});
