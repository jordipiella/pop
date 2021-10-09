import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IApiResponse } from '../../api/interfaces/response.interface';
import { ItemsFacade } from './items.facade';
import { IQueryParams } from '../../api/interfaces/pagination.interface';
import { ItemsService } from './items/items.service';
import { itemMockModel } from './items/mocks/item-mock.model';
import { ItemModel } from './items/models/item.model';

const itemRes: ItemModel[] = [
  itemMockModel,
  itemMockModel,
  itemMockModel
];

describe('ItemsService', () => {
  let service: ItemsFacade;
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
      ],
      providers: [
        {
          provide: ItemsService, useValue: itemService
        }
      ]
    });
    service = TestBed.inject(ItemsFacade);
  });

  describe('#getAllItems()', () => {
    it('should call itemService.getAllItems and return a Observable<IApiResponse<ItemModel>> without params', () => {
      service.getAllItems()
        .subscribe((res: IApiResponse<ItemModel>) => {
          expect(res.data).toEqual(itemRes);
        });
      expect(itemService.getAll).toHaveBeenCalled();
    });

    it('should call itemService.getAllItems and return a Observable<IApiResponse<ItemModel>> with params', () => {
      const params: IQueryParams = {
        _limit: 3,
        _page: 0
      }
      service.getAllItems(params)
        .subscribe((res: IApiResponse<ItemModel>) => {
          expect(res.data).toEqual(itemRes);
        });
      expect(itemService.getAll).toHaveBeenCalledWith(params);
    });
  });
});
