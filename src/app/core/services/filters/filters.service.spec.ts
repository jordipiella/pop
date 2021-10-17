import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FiltersService } from './filters.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FilterEnum, IFilter } from '@core';


describe('FiltersService', () => {
  let service: FiltersService;
  let translate: TranslateService;
  const fb: FormBuilder = new FormBuilder();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder
      ]
    });
    service = TestBed.inject(FiltersService);
    translate = TestBed.inject(TranslateService);
  });

  describe('#loadFilter', () => {
    it('should call service.sortSub', () => {
      spyOn(service, 'searchSub');
      spyOn(service, 'sortSub');
      service.loadFilter(FilterEnum.sort);
      expect(service.searchSub).not.toHaveBeenCalled();
      expect(service.sortSub).toHaveBeenCalledTimes(1);
    });
    it('should call service.searchSub', () => {
      spyOn(service, 'searchSub');
      spyOn(service, 'sortSub');
      service.loadFilter(FilterEnum.search);
      expect(service.searchSub).toHaveBeenCalled();
      expect(service.sortSub).not.toHaveBeenCalledTimes(1);
    });
  })

  describe('#searchSub', () => {
    it('should call setSelected with FilterEnum.search, value', fakeAsync(() => {
      service.searchLoaded = false;
      const searchForm: FormControl = fb.control('');
      service.searchForm = searchForm;
      spyOn(service, 'setSelected');
      spyOn(service.subscriptions, 'push');
      service.searchSub();
      service.searchForm.setValue('value');
      tick(600);
      expect(service.setSelected).toHaveBeenCalledOnceWith(FilterEnum.search, 'value');
      expect(service.subscriptions.push).toHaveBeenCalledTimes(1);
      expect(service.searchLoaded).toEqual(true);
    }));
    it('should don`t call setSelected if searchLoaded = true', fakeAsync(() => {
      service.searchLoaded = true;
      const searchForm: FormControl = fb.control('');
      service.searchForm = searchForm;
      spyOn(service, 'setSelected');
      spyOn(service.subscriptions, 'push');
      service.searchSub();
      service.searchForm.setValue('value');
      tick(600);
      expect(service.setSelected).not.toHaveBeenCalled();
      expect(service.subscriptions.push).not.toHaveBeenCalled();
      expect(service.searchLoaded).toEqual(true);
    }));
  })

  describe('#setSelected', () => {
    it('should set Filters to ', () => {
      service.setSelected(FilterEnum.search, 'value');
      service.selectedFilters$
        .subscribe((filters: IFilter) => expect(filters).toEqual({ search: 'value' }));
    });
  })

  describe('#sortSub', () => {
    it('should call setSelected with FilterEnum.sort, value', fakeAsync(() => {
      service.sortLoaded = false;
      const sortForm: FormControl = fb.control('');
      service.searchForm = sortForm;
      spyOn(service, 'setSelected');
      spyOn(service.subscriptions, 'push');
      service.sortSub();
      service.sortForm.setValue('value');
      tick(600);
      expect(service.setSelected).toHaveBeenCalledOnceWith(FilterEnum.sort, 'value');
      expect(service.subscriptions.push).toHaveBeenCalledTimes(1);
      expect(service.sortLoaded).toEqual(true);
    }));
    it('should call setSelected  if sortLoaded = true', fakeAsync(() => {
      service.sortLoaded = true;
      const sortForm: FormControl = fb.control('');
      service.searchForm = sortForm;
      spyOn(service, 'setSelected');
      spyOn(service.subscriptions, 'push');
      service.sortSub();
      service.sortForm.setValue('value');
      tick(600);
      expect(service.setSelected).not.toHaveBeenCalled();
      expect(service.subscriptions.push).not.toHaveBeenCalled();
      expect(service.sortLoaded).toEqual(true);
    }));
  })

  describe('#getControl', () => {
    it('should return sortForm or searchForm', () => {
      const sortForm: FormControl = fb.control('sort');
      const searchForm: FormControl = fb.control('search');
      service.sortForm = sortForm;
      service.searchForm = searchForm;
      expect(service.getControl(FilterEnum.sort)).toEqual(sortForm);
      expect(service.getControl(FilterEnum.search)).toEqual(searchForm);
    });
  })

});
