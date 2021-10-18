import { TestBed } from '@angular/core/testing';
import { IQueryParams } from '../..';
import { ApiItemsParamsService } from './api-items-params.service';


describe('ApiItemsParamsService', () => {
  let service: ApiItemsParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        ApiItemsParamsService
      ]
    });
    service = TestBed.inject(ApiItemsParamsService);
  });

  describe('#get params', () => {
    it('should get params', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1, _sort: 'title', _order: 'asc' };
      service.params = queryParams;
      expect(service.params).toEqual(queryParams);
    });
  });

  describe('#set params', () => {
    it('should set params', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1, _sort: 'title', _order: 'asc' };
      service.params = queryParams;
      expect(service.params).toEqual(queryParams);
    });
  });

  describe('#setSort', () => {
    it('should set _sort and default order asc', () => {
      const paramsSort: IQueryParams = { _limit: 5, _page: 1 };
      const paramsRes: IQueryParams = { _limit: 5, _page: 1, _sort: 'title', _order: 'asc' };
      spyOnProperty(service, 'params', 'get').and.returnValue(paramsSort);
      const setSpy: jasmine.Spy = spyOnProperty(service, 'params', 'set');
      spyOn(service, 'removeSort');
      service.setSort('title');
      expect(service.removeSort).not.toHaveBeenCalled();
      expect(service.params).toEqual(paramsRes);
      expect(setSpy).toHaveBeenCalledWith(paramsRes);
    });
    it('should call removeSort if value is null', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      spyOn(service, 'removeSort');
      service.setSort('');
      expect(service.removeSort).toHaveBeenCalled();
    });
  });

  describe('#removeSort', () => {
    it('should remove sort From queryParams', () => {
      const queryParamsRes: IQueryParams = { _limit: 5, _page: 1 };
      const queryParams: IQueryParams = { _limit: 5, _page: 1, _sort: 'title', _order: 'asc' };
      spyOnProperty(service, 'params', 'get').and.returnValue(queryParams);
      const setSpy: jasmine.Spy = spyOnProperty(service, 'params', 'set');
      service.removeSort();
      expect(setSpy).toHaveBeenCalledOnceWith(queryParamsRes);
    });
  });

  describe('#setSearch', () => {
    it('should set _search', () => {
      const paramsSort: IQueryParams = { _limit: 5, _page: 1 };
      const paramsRes: IQueryParams = { _limit: 5, _page: 1, q: 'title'};
      spyOnProperty(service, 'params', 'get').and.returnValue(paramsSort);
      const setSpy: jasmine.Spy = spyOnProperty(service, 'params', 'set');
      spyOn(service, 'removeSearch');
      service.setSearch('title');
      expect(service.removeSearch).not.toHaveBeenCalled();
      expect(service.params).toEqual(paramsRes);
      expect(setSpy).toHaveBeenCalledWith(paramsRes);
    });
    it('should call setSearch if value is null', () => {
      const paramsRes: IQueryParams = { _limit: 5, _page: 1, q: 'title' };
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      spyOnProperty(service, 'params', 'get').and.returnValue(queryParams);
      const setSpy: jasmine.Spy = spyOnProperty(service, 'params', 'set');
      spyOn(service, 'removeSearch');
      service.setSearch('');
      expect(service.removeSearch).toHaveBeenCalled();
      expect(setSpy).not.toHaveBeenCalled();
    });
  });

  describe('#removeSearch', () => {
    it('should remove sort From queryParams', () => {
      const queryParamsRes: IQueryParams = { _limit: 5, _page: 1 };
      const queryParams: IQueryParams = { _limit: 5, _page: 1, q: 'search' };
      spyOnProperty(service, 'params', 'get').and.returnValue(queryParams);
      const setSpy: jasmine.Spy = spyOnProperty(service, 'params', 'set');
      service.removeSearch();
      expect(setSpy).toHaveBeenCalledOnceWith(queryParamsRes);
    });
  });

  describe('#resetParams', () => {
    it('should set params to defaultQueryParams', () => {
      service.params = { _page: 2, _limit: 10 };
      service.resetParams();
      expect(service.params).toEqual(service.defaultQueryParams);
    });
  });
});
