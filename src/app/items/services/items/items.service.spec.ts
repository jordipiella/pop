import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ApiItemsService,
  itemMockContract,
  IApiResponse,
  ItemContract,
  IQueryParams
} from 'src/app/items/api';
import { of } from 'rxjs';
import { ItemsService } from './items.service';
import { itemMockModel } from '../../mocks/item-mock.model';
import { ItemModel } from '../../models/item.model';
import { ItemTranslator } from '../../translate/item.translator';
import { provideMockStore } from '@ngrx/store/testing';
import { AppFacade } from '../../../core/services/app.facade';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiItemsParamsService } from '../../api/services/api-items-params/api-items-params.service';

const initialState: unknown = {
  data: [],
  total: null,
  loading: false,
  error: null
};
const itemContracts: ItemContract[] = [
  itemMockContract,
  itemMockContract,
  itemMockContract
];
const itemModels: ItemModel[] = [
  itemMockModel,
  itemMockModel,
  itemMockModel
];
let mockRes: IApiResponse<ItemContract> = {
  total: 5,
  data: itemContracts
};

describe('ItemsService', () => {
  let service: ItemsService;
  let apiItems: ApiItemsService;
  let apiItemsParams: ApiItemsParamsService;
  let appFacade: AppFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        ApiItemsService,
        FormBuilder,
        provideMockStore({ initialState: { items: initialState }})

      ]
    });
    service = TestBed.inject(ItemsService);
    apiItems = TestBed.inject(ApiItemsService);
    appFacade = TestBed.inject(AppFacade);
    apiItemsParams = TestBed.inject(ApiItemsParamsService);
  });
  afterEach(() => {
    mockRes = {
      total: 5,
      data: itemContracts
    };
  });

  describe('#getAllItems()', () => {
    it('should call apiItems.getAllItems and return a Observable<IApiResponse<ItemContract>> without params', () => {
      spyOn(apiItems, 'getAll').and.returnValue(of(mockRes));
      spyOn(ItemTranslator, 'translateContractToModel').and.returnValue(itemMockModel);
      service.getAll()
        .subscribe((res: IApiResponse<ItemModel>) => {
          expect(res.data).toEqual(itemModels);
          expect(ItemTranslator.translateContractToModel).toHaveBeenCalledTimes(3);
        });
      expect(apiItems.getAll).toHaveBeenCalled();
    });

    it('should call apiItems.getAllItems and don`t call ItemTranslator.translateContractToModel', () => {
      mockRes.data = [];
      spyOn(apiItems, 'getAll').and.returnValue(of(mockRes));
      spyOn(ItemTranslator, 'translateContractToModel').and.returnValue(itemMockModel);
      service.getAll()
        .subscribe((res: IApiResponse<ItemModel>) => {
          expect(res.data).toEqual([]);
          expect(ItemTranslator.translateContractToModel).toHaveBeenCalledTimes(0);
        });
      expect(apiItems.getAll).toHaveBeenCalled();
    });

    it('should call apiItems.getAllItems and return a Observable<IApiResponse<ItemContract>> with params', () => {
      spyOn(apiItems, 'getAll').and.returnValue(of(mockRes));
      spyOn(ItemTranslator, 'translateContractToModel').and.returnValue(itemMockModel);
      const params: IQueryParams = {
        _limit: 3,
        _page: 0
      }
      service.getAll(params)
        .subscribe((res: IApiResponse<ItemModel>) => {
          expect(res.data).toEqual(itemModels);
          expect(ItemTranslator.translateContractToModel).toHaveBeenCalledTimes(3);
        });
      expect(apiItems.getAll).toHaveBeenCalledWith(params);
    });
  });

  describe('#setFavorieProp()', () => {
    it('should call appFacade.isInFavorites and set fav property to true', () => {
      spyOn(appFacade, 'isInFavorites').and.returnValue(true);
      const res: ItemModel[] = service.setFavoriteProp([ itemMockModel, itemMockModel ]);
      expect(res[0].favorite).toEqual(true);
      expect(res[1].favorite).toEqual(true);
      expect(appFacade.isInFavorites).toHaveBeenCalledTimes(2);
      expect(appFacade.isInFavorites).toHaveBeenCalledWith(itemMockModel);
    });
    it('should call appFacade.isInFavorites and set fav property to false', () => {
      const itemWithFavTrue: ItemModel = { ...itemMockModel, favorite: true };
      spyOn(appFacade, 'isInFavorites').and.returnValue(false);
      const res: ItemModel[] = service.setFavoriteProp([ itemWithFavTrue, itemWithFavTrue ]);
      expect(res[0].favorite).toEqual(false);
      expect(res[1].favorite).toEqual(false);
      expect(appFacade.isInFavorites).toHaveBeenCalledTimes(2);
      expect(appFacade.isInFavorites).toHaveBeenCalledWith(itemWithFavTrue);
    });
  });

  describe('#get params()', () => {
    it('should get apiItemsParams.params', () => {
      spyOnProperty(apiItemsParams, 'params', 'get').and.returnValue({ _page: 0, _limit: 5 });
      expect(service.params).toEqual({ _page: 0, _limit: 5 })
    });
  });

  describe('#set params()', () => {
    it('should call apiItemsParams.params', () => {
      const setSpy: jasmine.Spy = spyOnProperty(apiItemsParams, 'params', 'set');
      service.params = { _page: 0, _limit: 5 };
      expect(setSpy).toHaveBeenCalledOnceWith({ _page: 0, _limit: 5 });
    });
  });

  describe('#setSort()', () => {
    it('should call apiItemsParams.setSort', () => {
      spyOn(apiItemsParams, 'setSort');
      service.setSort('sort');
      expect(apiItemsParams.setSort).toHaveBeenCalledOnceWith('sort');
    });
  });

  describe('#removeSort()', () => {
    it('should call apiItemsParams.removeSort', () => {
      spyOn(apiItemsParams, 'removeSort');
      service.removeSort();
      expect(apiItemsParams.removeSort).toHaveBeenCalledTimes(1);
    });
  });

  describe('#setSearch()', () => {
    it('should call apiItemsParams.setSearch', () => {
      spyOn(apiItemsParams, 'setSearch');
      service.setSearch('search');
      expect(apiItemsParams.setSearch).toHaveBeenCalledOnceWith('search');
    });
  });

  describe('#removeSearch()', () => {
    it('should call apiItemsParams.removeSearch', () => {
      spyOn(apiItemsParams, 'removeSearch');
      service.removeSearch();
      expect(apiItemsParams.removeSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('#resetParams()', () => {
    it('should call apiItemsParams.resetParams', () => {
      spyOn(apiItemsParams, 'resetParams');
      service.resetParams();
      expect(apiItemsParams.resetParams).toHaveBeenCalledTimes(1);
    });
  });


});
