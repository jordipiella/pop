import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { MockComponent } from '../mocks/mock-component';
import { AppFacade } from '../services/app.facade';

const initialState: unknown = {
  data: []
};

describe('HeaderComponet', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let appFacade: AppFacade;

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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('#openFavoritesModal', () => {
    it('should call appFacade.openFavoritesModal', () => {
      spyOn(appFacade, 'openFavoritesModal');
      component.openFavoriteModal();
      expect(appFacade.openFavoritesModal).toHaveBeenCalled()
    })
  });

});
