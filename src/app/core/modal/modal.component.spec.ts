import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from './modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from '../mocks/mock-component';
import { of } from 'rxjs';
import { AppFacade } from '../services/app.facade';
import { ViewContainerRef } from '@angular/core';
import { ViewContainerRefMock } from '@core';
import { provideMockStore } from '@ngrx/store/testing';

const initialState: unknown = {
  data: []
};

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let appFacade: AppFacade;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        ModalComponent,
        MockComponent({ selector: 'svg-icon', inputs: ['svgStyle']})
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        TranslateService,
        provideMockStore({ initialState: { favorites: initialState }})

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    appFacade = TestBed.inject(AppFacade);
    fixture.detectChanges();
  }));

  describe('#ngAfterViewInit', () => {
    it('should call component.isOpenSubs', () => {
      spyOn(component, 'isOpenSubs');
      component.ngAfterViewInit();
      expect(component.isOpenSubs).toHaveBeenCalled();
    });
  });

  describe('#ngOnDestroy', () => {
    it('should call unsubscribe', () => {
      component.subscriptions = [of().subscribe()];
      spyOn(component.subscriptions[0], 'unsubscribe');
      component.ngOnDestroy();
      expect(component.subscriptions[0].unsubscribe).toHaveBeenCalled();
    });
  });

  describe('#isOpenSubs', () => {
    it('should call setIsVisible and modalBehaviour', () => {
      const ref: ViewContainerRef = new ViewContainerRefMock();
      component.content = ref;
      spyOnProperty(appFacade, 'isOpen$', 'get').and.returnValue(of(true));
      spyOn(component, 'setIsVisible');
      spyOn(component, 'modalBehaviour');
      component.isOpenSubs();
      expect(component.setIsVisible).toHaveBeenCalledWith(true);
      expect(component.modalBehaviour).toHaveBeenCalledWith(true, ref);
    });
  });

  describe('#modalBehaviour', () => {
    it('should call component.modalOpened with ViewContainerRef', fakeAsync(() => {
      const ref: ViewContainerRef = new ViewContainerRefMock();
      spyOn(component, 'modalOpened');
      component.modalBehaviour(true, ref);
      tick(200);
      expect(component.modalOpened).toHaveBeenCalledWith(ref);
    }));
    it('should don`t call component.modalOpened', () => {
      const ref: ViewContainerRef = new ViewContainerRefMock();
      spyOn(component, 'modalOpened');
      component.modalBehaviour(false, ref);
      expect(component.modalOpened).not.toHaveBeenCalledWith(ref);
    });
  });

  describe('#modalOpened', () => {
    it('should call call appFacade.modalOpened with ViewContainerRef', () => {
      const ref: ViewContainerRef = new ViewContainerRefMock();
      spyOn(appFacade, 'modalOpened');
      component.modalOpened(ref);
      expect(appFacade.modalOpened).toHaveBeenCalledWith(ref);
    });
    it('should don`t call appFacade.modalOpened', () => {
      spyOn(appFacade, 'modalOpened');
      component.modalOpened(null);
      expect(appFacade.modalOpened).not.toHaveBeenCalled();
    });
  });

  describe('#setIsVisible', () => {
    it('should set isVisible to true', () => {
      component.isVisible = false;
      component.setIsVisible(true);
      expect(component.isVisible).toEqual(true);
    });
    it('should set isVisible to false', () => {
      component.isVisible = true;
      component.setIsVisible(false);
      expect(component.isVisible).toEqual(false);
    });
  });

  describe('#close', () => {
    it('should call appFacade.closeModal', () => {
      spyOn(appFacade, 'closeModal');
      component.close();
      expect(appFacade.closeModal).toHaveBeenCalled();
    });
  });

});
