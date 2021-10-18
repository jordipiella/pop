import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { MockComponent } from '@core';
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        MockComponent({ selector: 'svg-icon' })
      ],
      providers: [
        FormBuilder
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#ngOnDestroy', () => {
    it('should call unsubscribe', () => {
      component.subscriptions = [of().subscribe()];
      spyOn(component.subscriptions[0], 'unsubscribe');
      component.ngOnDestroy();
      expect(component.subscriptions[0].unsubscribe).toHaveBeenCalled();
    });
  });

  describe('#onInput', () => {
    it('should call onTouched and onChanged with value ', () => {
      spyOn(component, 'onTouched');
      spyOn(component, 'onChanged');
      component.onInput([]);
      expect(component.onChanged).toHaveBeenCalledOnceWith([]);
    });
  });

  describe('#writeValue', () => {
    it('should set value', () => {
      const val: any = { value: 'value' };
      component.value = { value: '' };
      component.writeValue(val);
      expect(component.value).toEqual(val);
    });
  });

  describe('#registerOnChange', () => {
    it('should set onChanged', () => {
      component.onChanged = null;
      component.registerOnChange('fn');
      expect(component.onChanged).toEqual('fn');
    });
  });

  describe('#registerOnTouched', () => {
    it('should set onTouched', () => {
      component.onTouched = null;
      component.registerOnTouched('fn');
      expect(component.onTouched).toEqual('fn');
    });
  });

  describe('#setDisabledState', () => {
    it('should set disabled', () => {
      component.disabled = true;
      component.setDisabledState(false);
      expect(component.disabled).toEqual(false);
    });
  });

  describe('#cleanSearch', () => {
    it('should remove value', () => {
      component.form.get('search')?.setValue('searchValue');
      component.cleanSearch();
      expect(component.form.get('search')?.value).toEqual('');
    });
  });

  describe('#isVisibleClean', () => {
    it('should return true if search control have value', () => {
      component.form.get('search')?.setValue('searchValue');
      component.isVisibleClean();
      expect(component.isVisibleClean()).toEqual(true);
    });
    it('should return false if search control don`t have value', () => {
      component.form.get('search')?.setValue('');
      component.isVisibleClean();
      expect(component.isVisibleClean()).toEqual(false);
    });
  });

});
