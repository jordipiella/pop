import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { FiltersComponent } from './filters.component';
import { TranslateModule } from '@ngx-translate/core';
import { FilterEnum } from '@core';
import { AppFacade } from '../core/services/app.facade';
import { IFilterOption } from '../core/interfaces/filter-option.interface';

const fb: FormBuilder = new FormBuilder();

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let appFacade: AppFacade;
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
        provideMockStore({ initialState: { favorites: initialState } })

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    appFacade = TestBed.inject(AppFacade);
    fixture.detectChanges();
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
  })

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
      spyOn(appFacade, 'getSortByOptions').and.returnValue(options);
      component.setSortByOptions();
      expect(component.sortByOptions).toEqual(options);
      expect(appFacade.getSortByOptions).toHaveBeenCalledTimes(1);
    });
  })
});
