import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppFacade } from './app.facade';
import { IFavoritesState } from '../state/favorites/favorites.reducer';
import * as fromFavorites from '../state/favorites/favorites.reducer';
import { productMockModel } from '../mocks/product-mock.model';
import { addFavorite, removeFavorite } from '../state/favorites/favorites.actions';
import { AlertService } from './alert/alert.service';

fdescribe('AppFacade', () => {
  let service: AppFacade;
  let store: Store<IFavoritesState>;
  let alertService: AlertService;
  let modalService: ModalService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(fromFavorites.reducer),
      ],
      providers: [
      ]
    });
    service = TestBed.inject(AppFacade);
    store = TestBed.inject(Store);
    alertService = TestBed.inject(AlertService);
    modalService = TestBed.inject(ModalService);
  });

  describe('#addFavorite()', () => {
    it('should call should call store.dispatch with addFavorite', () => {
      spyOn(store, 'dispatch');
      service.addFavorite(productMockModel);
      expect(store.dispatch).toHaveBeenCalledWith(addFavorite({ data: [ productMockModel ] }));
    });
  });

  describe('#removeFavorite()', () => {
    it('should call store.dispatch with removeFavorite', () => {
      spyOn(store, 'dispatch');
      service.removeFavorite(productMockModel);
      expect(store.dispatch).toHaveBeenCalledWith(removeFavorite({ data: [ productMockModel ]}));
    });
  });

  describe('#successAlert()', () => {
    it('should call alertService.success with title, text', () => {
      const title: string = 'title';
      const text: string = 'text';
      spyOn(alertService, 'success');
      service.successAlert(title, text);
      expect(alertService.success).toHaveBeenCalledWith(title, text);
    });
  });

  describe('#errorAlert()', () => {
    it('should call alertService.error with title, text', () => {
      const title: string = 'title';
      const text: string = 'text';
      spyOn(alertService, 'error');
      service.errorAlert(title, text);
      expect(alertService.error).toHaveBeenCalledWith(title, text);
    });
  });

  describe('#openModal()', () => {
    it('should call modalService.openModal with component, module', () => {
      const component: any = { component: 'component' };
      const module: any = { module: 'module' };
      spyOn(modalService, 'openModal');
      service.openModal(component, module);
      expect(modalService.openModal).toHaveBeenCalledWith(component, module);
    });
    it('should call modalService.openModal with component, null', () => {
      const component: any = { component: 'component' };
      spyOn(modalService, 'openModal');
      service.openModal(component, null);
      expect(modalService.openModal).toHaveBeenCalledWith(component, null);
    });
  });

  describe('#closeModal()', () => {
    it('should call modalService.closeModal', () => {
      spyOn(modalService, 'closeModal');
      service.closeModal();
      expect(modalService.closeModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('#modalOpened()', () => {
    it('should call modalService.modalOpened', () => {
      const ref: ViewContainerRef = null;
      spyOn(modalService, 'modalOpened');
      service.modalOpened();
      expect(modalService.modalOpened).toHaveBeenCalledTimes(1);
    });
  });

  describe('#get isOpen$', () => {
    it('should return Observable<boolean>', () => {
      spyOn(modalService, 'isOpen$').and.returnValue(of(true));
      service.isOpen$
        .subscribe((res) => {
          expect(res).toEqual(true);
        });
    });
  });

});
