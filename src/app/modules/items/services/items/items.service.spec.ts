import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ApiItemsService,
  itemMockContract,
  IApiResponse,
  ItemContract,
  IQueryParams
} from '@api';
import { of } from 'rxjs';
import { ItemsService } from './items.service';
import { itemMockModel } from '../../mocks/item-mock.model';
import { ItemModel } from '../../models/item.model';
import { ItemTranslator } from '../../translate/item.translator';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiItemsService
      ]
    });
    service = TestBed.inject(ItemsService);
    apiItems = TestBed.inject(ApiItemsService);
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
});
