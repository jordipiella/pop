import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MockComponent } from '../mocks/mock-component';
import { AppFacade } from '../services/app.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';

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
    appFacade = TestBed.inject(AppFacade);
    translate = TestBed.inject(TranslateService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#ngOnInit', () => {
    it('should call translate.instant withheader.title', () => {
      spyOn(translate, 'instant');
      component.ngOnInit();
      expect(translate.instant).toHaveBeenCalledWith('header.title')
    })
  })

  describe('#openFavoritesModal', () => {
    it('should call appFacade.openFavoritesModal', () => {
      spyOn(appFacade, 'openFavoritesModal');
      component.openFavoriteModal();
      expect(appFacade.openFavoritesModal).toHaveBeenCalled()
    })
  })

});
