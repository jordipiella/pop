import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { MockComponent } from '../mocks/mock-component';
import { AppFacade } from '../services/app.facade';
import { of } from 'rxjs';
import { EN_LANG } from '../constants/languages.constants';

const initialState: unknown = {
  data: []
};

describe('HeaderComponet', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let appFacade: AppFacade;
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        MockComponent({ selector: 'svg-icon' })
      ],
      providers: [
        provideMockStore({ initialState: { favorites: initialState } }),
        FormBuilder
      ],
      imports: [
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    appFacade = TestBed.inject(AppFacade);
    translate = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });


  describe('#ngOnInit', () => {
    it('should call setTitle', () => {
      spyOn(component, 'setTitle');
      component.ngOnInit();
      expect(component.setTitle).toHaveBeenCalledTimes(1);
    });
  });

  describe('#setTitle', () => {
    it('should call', fakeAsync(() => {
      component.title = '';
      spyOn(translate, 'getTranslation').and.returnValue(of({ header: { title: 'Title' } }));
      component.setTitle();
      expect(translate.getTranslation).toHaveBeenCalledOnceWith(EN_LANG);
      expect(component.title).toEqual('Title');
    }));
  });

  describe('#openFavoritesModal', () => {
    it('should call appFacade.openFavoritesModal', () => {
      spyOn(appFacade, 'openFavoritesModal');
      component.openFavoriteModal();
      expect(appFacade.openFavoritesModal).toHaveBeenCalledTimes(1);
    });
  });

});


