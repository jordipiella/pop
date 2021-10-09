import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiModule } from '@api';
import { IApiResponse } from '../../api/interfaces/response.interface';
import { ItemsFacade } from './items.facade';
import { ApiItemsService } from '../../api/services/api-items/api-items.service';
import { ItemContract } from '../../api/services/api-items/contracts/item.contract';
import { of } from 'rxjs';
import { itemMockContract } from '../../api/services/api-items/mocks/item-mock.contract';
import { IQueryParams } from '../../api/interfaces/pagination.interface';

describe('ItemsService', () => {
  let service: ItemsFacade;
  const apiItems: jasmine.SpyObj<ApiItemsService> = jasmine.createSpyObj('ApiItemsService', {
    getAll: of({
      total: 5,
      data: [
        itemMockContract,
        itemMockContract,
        itemMockContract
      ]
    })
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ApiModule
      ],
      providers: [
        {
          provide: ApiItemsService, useValue: apiItems
        }
      ]
    });
    service = TestBed.inject(ItemsFacade);
  });

  describe('#getAllItems()', () => {
    it('should call apiItems.getAllItems and return a Observable<IApiResponse<ItemContract>> without params', () => {
      service.getAllItems()
        .subscribe((res: IApiResponse<ItemContract>) => {
          expect(res.data).toEqual([itemMockContract, itemMockContract, itemMockContract]);
        });
      expect(apiItems.getAll).toHaveBeenCalled();
    });

    it('should call apiItems.getAllItems and return a Observable<IApiResponse<ItemContract>> with params', () => {
      const params: IQueryParams = {
        _limit: 3,
        _page: 0
      }
      service.getAllItems(params)
        .subscribe((res: IApiResponse<ItemContract>) => {
          expect(res.data).toEqual([itemMockContract, itemMockContract, itemMockContract]);
        });
      expect(apiItems.getAll).toHaveBeenCalledWith(params);
    });
  });
});
