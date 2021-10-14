import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockComponent } from './core/mocks/mock-component';
import { ModalService } from './core/services/modal/modal.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let modalService: ModalService;
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent,
        MockComponent({ selector: 'app-header' })
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    translate = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  describe('#ngOnInit', () => {
    it('should call translate setDefaultLang and instant with en and header.title', () => {
      spyOn(translate, 'setDefaultLang');
      spyOn(translate, 'instant');
      component.ngOnInit();
      expect(translate.setDefaultLang).toHaveBeenCalledWith('en');
      expect(translate.instant).toHaveBeenCalledWith('header.title');
    });
  });

  describe('#headerClick', () => {
    it('should call component.openFavoriteModal', () => {
      spyOn(component, 'openFavoriteModal');
      component.headerClick('star');
      expect(component.openFavoriteModal).toHaveBeenCalled();
    });
  });

  // TODO: After refactor fn
  // describe('#openFavoriteModal', () => {
  //   it('should', () => {
  //     spyOn(modalService, 'openModal');
  //     component.openFavoriteModal();
  //     expect(modalService.openModal).toHaveBeenCalled();
  //   });
  // });

});
