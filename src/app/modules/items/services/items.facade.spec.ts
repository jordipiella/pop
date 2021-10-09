import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemsFacade } from './items.facade';
import { IQueryParams } from '../../api/interfaces/pagination.interface';
import { ItemsService } from './items/items.service';
import { itemMockModel } from './items/mocks/item-mock.model';
import { ItemModel } from './items/models/item.model';
import { ItemsState } from '../state/items.reducer';
import { Store, StoreModule } from '@ngrx/store';
import * as fromItems from '../state/items.reducer';
import { getItems, resetStateItems } from '../state/items.actions';

const itemRes: ItemModel[] = [
  itemMockModel,
  itemMockModel,
  itemMockModel
];

describe('ItemsFacade', () => {
  let service: ItemsFacade;
  let store: Store<ItemsState>;
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
        StoreModule.forRoot(fromItems.reducer),
      ],
      providers: [
        {
          provide: ItemsService, useValue: itemService
        }
      ]
    });
    service = TestBed.inject(ItemsFacade);
    store = TestBed.inject(Store);
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
});
