import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppFacade } from './app.facade';
import { IFavoritesState } from '../state/favorites/favorites.reducer';
import * as fromFavorites from '../state/favorites/favorites.reducer';
import { productMockModel } from '../mocks/product-mock.model';
import { addFavorite, removeFavorite } from '../state/favorites/favorites.actions';
import { AlertService } from './alert/alert.service';
import { ModalService } from './modal/modal.service';
import { ViewContainerRef } from '@angular/core';
import { FilterEnum, IFilter, ViewContainerRefMock } from '@core';
import { of } from 'rxjs';
import { FavoriteService } from './favorites/favorite.service';
import { itemMockModel } from '../../modules/items/mocks/item-mock.model';
import { FiltersService } from './filters/filters.service';
import { IFilterOption } from '../interfaces/filter-option.interface';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('AppFacade', () => {
  let service: AppFacade;
  let store: Store<IFavoritesState>;
  let alertService: AlertService;
  let modalService: ModalService;
  let favoriteService: FavoriteService;
  let filtersService: FiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(fromFavorites.reducer)
      ],
      providers: [
        FormBuilder
      ]
    });
    service = TestBed.inject(AppFacade);
    store = TestBed.inject(Store);
    alertService = TestBed.inject(AlertService);
    modalService = TestBed.inject(ModalService);
    favoriteService = TestBed.inject(FavoriteService);
    filtersService = TestBed.inject(FiltersService);
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
      expect(store.dispatch).toHaveBeenCalledOnceWith(removeFavorite({ data: [ productMockModel ]}));
    });
  });

  describe('#openFavoritesModal()', () => {
    it('should call', () => {
      spyOn(favoriteService, 'openFavoritesInModal');
      service.openFavoritesModal();
      expect(favoriteService.openFavoritesInModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('#get favorites()', () => {
    it('should call', () => {
      spyOnProperty(favoriteService, 'favorites', 'get').and.returnValue([productMockModel]);
      service.favorites;
      expect(service.favorites).toEqual([productMockModel]);
    });
  });

  describe('#isInFavorites()', () => {
    it('should call favoriteService.isInFavorites with itemModel', () => {
      spyOn(favoriteService, 'isInFavorites');
      service.isInFavorites(itemMockModel);
      expect(favoriteService.isInFavorites).toHaveBeenCalledOnceWith(itemMockModel);
    });
  });

  describe('#successAlert()', () => {
    it('should call alertService.success with title, text', () => {
      const title: string = 'title';
      const text: string = 'text';
      spyOn(alertService, 'success');
      service.successAlert(title, text);
      expect(alertService.success).toHaveBeenCalledOnceWith(title, text);
    });
  });

  describe('#errorAlert()', () => {
    it('should call alertService.error with title, text', () => {
      const title: string = 'title';
      const text: string = 'text';
      spyOn(alertService, 'error');
      service.errorAlert(title, text);
      expect(alertService.error).toHaveBeenCalledOnceWith(title, text);
    });
  });

  describe('#openModal()', () => {
    it('should call modalService.openModal with component, module', () => {
      const component: any = { component: 'component' };
      const module: any = { module: 'module' };
      spyOn(modalService, 'openModal');
      service.openModal(component, module);
      expect(modalService.openModal).toHaveBeenCalledOnceWith(component, module);
    });
    it('should call modalService.openModal with component, null', () => {
      const component: any = { component: 'component' };
      spyOn(modalService, 'openModal');
      service.openModal(component, null);
      expect(modalService.openModal).toHaveBeenCalledOnceWith(component, null);
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
      const ref: ViewContainerRef = new ViewContainerRefMock();
      spyOn(modalService, 'modalOpened');
      service.modalOpened(ref);
      expect(modalService.modalOpened).toHaveBeenCalledTimes(1);
    });
  });

  describe('#get isOpen$', () => {
    it('should return Observable<boolean>', () => {
      modalService.isOpen$ = of(true);
      service.isOpen$
        .subscribe((res) => {
          expect(res).toEqual(true);
        });
    });
  });

  describe('#selectedFilters', () => {
    it('should return Observable<IFilter>', () => {
      filtersService.selectedFilters$ = of({ sort: 'title' });
      service.selectedFilters()
      .subscribe((filters: IFilter) => expect(filters).toEqual({ sort: 'title' }));
    });
  });

  describe('#loadFilter', () => {
    it('should call filtersService.loadFilter with FilterEnum', () => {
      spyOn(filtersService, 'loadFilter');
      service.loadFilter(FilterEnum.sort);
      expect(filtersService.loadFilter).toHaveBeenCalledOnceWith(FilterEnum.sort);
    });
  });

  describe('#getControl', () => {
    it('should call filtersService.getControl with FilterEnum', () => {
      spyOn(filtersService, 'getControl');
      service.getControl(FilterEnum.sort);
      expect(filtersService.getControl).toHaveBeenCalledOnceWith(FilterEnum.sort);
    });
  });

  describe('#sortByOptions', () => {
    it('should return IFilterOption[]', () => {
      const options: IFilterOption[] = [
        {
          label: 'label',
          value: 'value'
        }
      ];
      filtersService.sortByOptions = options;
      const optionsRes: IFilterOption[] = service.getSortByOptions();
      expect(optionsRes).toEqual(options);
    });
  });

});
