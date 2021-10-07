import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ApiItemsService } from './api-items.service';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../../../environments/environment';
import { ItemContract } from './contracts/item.contract';
import { itemMockContract } from './mocks/item-mock.contract';
import { IApiResponse } from '../../interfaces/response.interface';
import { API_ITEMS_URL } from '../../constants/api.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

describe('ApiItemsService', () => {
  let service: ApiItemsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ApiItemsService
      ]
    });
    service = TestBed.inject(ApiItemsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getAll()', () => {
    it('should call correct url and return a Observable<IApiResponse<ItemContract>>', () => {
      let result: ItemContract[] = [];
      const apiRes: IApiResponse<ItemContract> = {
        total: null,
        data: [ itemMockContract ]
      };
      spyOn(service, 'httpResToApiResponse').and.returnValue(apiRes)
      service.getAll().subscribe((res: IApiResponse<ItemContract>) => result = res.data);
      const req: TestRequest = httpMock.expectOne(`${ environment.apiItemsUrl }/${ API_ITEMS_URL }?_limit=5&_page=1`);
      expect(req.request.method).toBe('GET');
      req.flush([itemMockContract]);
      expect(result).toEqual([itemMockContract]);
      expect(service.httpResToApiResponse).toHaveBeenCalled();
    });
  });

  describe('#httpResToApiResponse()', () => {
    it('should return apiResponse with total null', () => {
      const httpRes: HttpResponse<ItemContract[]> = new HttpResponse<ItemContract[]>({ body: [ itemMockContract ]});
      const apiRes: IApiResponse<ItemContract> = {
        total: null,
        data: [ itemMockContract ]
      };
      expect(service.httpResToApiResponse(httpRes)).toEqual(apiRes);
    });
    it('should return apiResponse with total 1', () => {
      const headers: HttpHeaders = new HttpHeaders();
      headers.append('X-Total-Count', '1')
      const httpRes: HttpResponse<ItemContract[]> = new HttpResponse<ItemContract[]>({ body: [ itemMockContract ], headers });
      const apiRes: IApiResponse<ItemContract> = {
        total: null,
        data: [ itemMockContract ]
      };
      expect(service.httpResToApiResponse(httpRes)).toEqual(apiRes);
    });
  });

});
