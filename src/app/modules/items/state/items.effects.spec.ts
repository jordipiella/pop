import { TestBed } from '@angular/core/testing';
import { Observable, throwError } from 'rxjs';
import { ItemsService } from '../services/items/items.service';
import { ItemsEffects } from './items.effects';
import { ItemsState } from './items.reducer';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getItems, getItemsSuccess } from './items.actions';
import { itemMockModel } from '../mocks/item-mock.model';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemModel } from '../models/item.model';
import { IApiResponse } from '@api';

const initialState = {
  data: [],
  total: null,
  loading: false,
  error: null
};

let mockRes: IApiResponse<ItemModel> = {
  total: 5,
  data: [itemMockModel]
};

describe('ItemsEffects', () => {
  let actions$: Observable<any>;
  let effects: ItemsEffects;
  let store: MockStore<ItemsState>;
  let itemService: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ItemsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });
    effects = TestBed.inject(ItemsEffects);
    store = TestBed.inject(MockStore);
    itemService = TestBed.inject(ItemsService);
  });

  describe('loadItems$', () => {
    it('should call itemService.getAll and return typed Action', () => {
      const spy: jasmine.Spy = spyOn(itemService, 'getAll').and.returnValue(of(mockRes));
      actions$ = of(getItems);
      effects.loadItems$.subscribe((res) => {
        expect(res).toEqual(getItemsSuccess(mockRes));
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call itemService.getAll and get error', () => {
      const spy: jasmine.Spy = spyOn(itemService, 'getAll').and.returnValue(throwError({ status: 500 }));
      const errorRes: any = {
        error: {
          status: 500
        },
        type: '[Items] - get Item list failure'
      };
      actions$ = of(getItems);
      effects.loadItems$.subscribe((res) => {
        expect(res).toEqual(errorRes);
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

});
