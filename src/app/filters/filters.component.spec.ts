import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FilterEnum } from '@core';
import { FiltersComponent } from './filters.component';
import { AppFacade } from '../core/services/app.facade';
import { IFilterOption } from '../core/interfaces/filter-option.interface';
import { ChangeDetectorRef } from '@angular/core';

const fb: FormBuilder = new FormBuilder();

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let appFacade: AppFacade;
  let translate: TranslateService;

  const initialState: unknown = {
    data: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FiltersComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        ChangeDetectorRef,
        provideMockStore({ initialState: { favorites: initialState } })

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    appFacade = TestBed.inject(AppFacade);
    translate = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  describe('#ngAfterViewInit', () => {
    it('should call appFacade.loadFilter with FilterEnum.search and return search', () => {
      const changeDetectorRef: ChangeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      const spy: jasmine.Spy = spyOn(changeDetectorRef.constructor.prototype, 'detectChanges');
      component.ngAfterViewInit();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#getTemplate', () => {
    it('should call appFacade.loadFilter with FilterEnum.search and return search', () => {
      spyOn(appFacade, 'loadFilter');
      expect(component.getTemplate(FilterEnum.search)).toEqual(component.search);
      expect(appFacade.loadFilter).toHaveBeenCalledOnceWith(FilterEnum.search);
    });
    it('should call appFacade.loadFilter with FilterEnum.sort and return sort', () => {
      spyOn(appFacade, 'loadFilter');
      expect(component.getTemplate(FilterEnum.sort)).toEqual(component.sort);
      expect(appFacade.loadFilter).toHaveBeenCalledOnceWith(FilterEnum.sort);
    });
  });

  describe('#getControl', () => {
    it('should call appFacade.getControl and return control', () => {
      const control: FormControl = fb.control('');
      spyOn(appFacade, 'getControl').and.returnValue(control);
      expect(component.getControl(FilterEnum.search)).toEqual(control);
      expect(appFacade.getControl).toHaveBeenCalledWith(FilterEnum.search);
    });
  });

  describe('#setSortByOptions', () => {
    it('should call appFacade.getControl and return control', () => {
      const options: IFilterOption[] = [
        {
          label: 'label',
          value: 'value' }
      ];
      spyOn(translate, 'instant');
      spyOn(appFacade, 'getSortByOptions').and.returnValue(options);
      component.setSortByOptions();
      expect(component.sortByOptions).toEqual(options);
      expect(appFacade.getSortByOptions).toHaveBeenCalledTimes(1);
      expect(translate.instant).toHaveBeenCalledOnceWith('label');
    });
  });
});
