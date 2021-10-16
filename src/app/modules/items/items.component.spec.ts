import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { IQueryParams } from '@api';
import { ItemsComponent } from './items.component';
import { ItemsFacade } from './services/items.facade';
import { itemMockModel } from './mocks/item-mock.model';
import { ItemModel } from './models/item.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from '../../core/mocks/mock-component';
import { IFilter } from '../../core/interfaces/filter.interface';

const initialState: unknown = {
  data: [],
  total: null,
  loading: false,
  error: null
};
const fb: FormBuilder = new FormBuilder();

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let itemsFacade: ItemsFacade;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        ItemsComponent,
        MockComponent({ selector: 'app-dropdown', inputs:[ 'formControl', 'options', 'emptyOption'] }),
        MockComponent({ selector: 'app-search', inputs:[ 'formControl', 'placeholder'] }),
        MockComponent({ selector: 'app-grid' }),
        MockComponent({ selector: 'app-button' }),
        MockComponent({ selector: 'app-badge' }),
        MockComponent({ selector: 'svg-icon' })
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        TranslateService,
        FormBuilder,
        provideMockStore({ initialState: { items: initialState }})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    itemsFacade = TestBed.inject(ItemsFacade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('#ngOnInit', () => {
    it('should call itemsSub, totalSub, sortSub, getAllItems', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      component.queryParams = queryParams;
      spyOn(component, 'itemsSub');
      spyOn(component, 'totalSub');
      spyOn(component, 'loadingSub');
      spyOn(component, 'filtersSub');
      spyOn(component, 'getAllItems');
      component.ngOnInit();
      expect(component.itemsSub).toHaveBeenCalledTimes(1);
      expect(component.totalSub).toHaveBeenCalledTimes(1);
      expect(component.loadingSub).toHaveBeenCalledTimes(1);
      expect(component.filtersSub).toHaveBeenCalledTimes(1);
      expect(component.getAllItems).toHaveBeenCalledOnceWith(queryParams);
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

  describe('#loadingSub', () => {
    it('should call setLoading and push subs to Subscription[]', () => {
      spyOn(component, 'setLoading');
      spyOn(component.subscriptions, 'push');
      itemsFacade.loading$ = of(true);
      component.loadingSub();
      expect(component.setLoading).toHaveBeenCalledWith(true);
      expect(component.subscriptions.push).toHaveBeenCalledTimes(1);
    });
  });

  describe('#setLoading', () => {
    it('should set loading to true', () => {
      component.loading = false;
      component.setLoading(true);
      expect(component.loading).toEqual(true);
    });
    it('should set loading to false', () => {
      component.loading = true;
      component.setLoading(false);
      expect(component.loading).toEqual(false);
    });
  });

  describe('#filtersSub', () => {
    it('should ', () => {
      const filters: IFilter = { sort: 'sort', search: 'search' };
      spyOn(itemsFacade, 'selectedFilters').and.returnValue(of(filters));
      spyOn(component, 'setFilterValue');
      component.filtersSub();
      expect(component.setFilterValue).toHaveBeenCalledOnceWith(filters);
    });
  });

  describe('#setFilterValue', () => {
    it('should call setSearch, setSort, resetList, getAllItems', () => {
      spyOn(component, 'setSearch');
      spyOn(component, 'setSort');
      spyOn(component, 'resetList');
      spyOn(component, 'getAllItems');
      component.setFilterValue({ sort: 'sort', search: 'search' });
      expect(component.setSearch).toHaveBeenCalledOnceWith('search');
      expect(component.setSort).toHaveBeenCalledOnceWith('sort');
      expect(component.resetList).toHaveBeenCalledTimes(1);
      expect(component.getAllItems).toHaveBeenCalledOnceWith({ _limit: 5, _page: 1 });
    });
  });

  describe('#setSearch', () => {
    it('should set q to query params', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      const queryParamsRes: IQueryParams = { _limit: 5, _page: 1, q: 'value' };
      component.queryParams = queryParams;
      component.setSearch('value');
      expect(component.queryParams).toEqual(queryParamsRes);
    });
    it('should remove q to query params', () => {
      const queryParamsRes: IQueryParams = { _limit: 5, _page: 1 };
      const queryParams: IQueryParams = { _limit: 5, _page: 1, q: 'value' };
      component.queryParams = queryParams;
      component.setSearch('');
      expect(component.queryParams).toEqual(queryParamsRes);
    });
  });


  describe('#setSort', () => {
    it('should set _sort and default order asc', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      const queryParamsRes: IQueryParams = { _limit: 5, _page: 1, _sort: 'title', _order: 'asc' };
      component.queryParams = queryParams;
      spyOn(component, 'removeSort');
      component.setSort('title');
      expect(component.removeSort).not.toHaveBeenCalled();
      expect(component.queryParams).toEqual(queryParamsRes);
    });
    it('should call removeSort if value is null', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      spyOn(component, 'removeSort');
      component.setSort('');
      expect(component.removeSort).toHaveBeenCalled();
    });
  });

  describe('#removeSort', () => {
    it('should remove sort From queryParams', () => {
      const queryParamsRes: IQueryParams = { _limit: 5, _page: 1 };
      const queryParams: IQueryParams = { _limit: 5, _page: 1, _sort: 'title', _order: 'asc' };
      component.queryParams = queryParams;
      component.removeSort();
      expect(component.queryParams).toEqual(queryParamsRes);
    });
  });

  describe('#resetList', () => {
    it('should ', () => {
      component.items = [ itemMockModel ];
      spyOn(itemsFacade, 'resetStateItems');
      component.resetList();
      expect(component.items).toEqual([]);
      expect(itemsFacade.resetStateItems).toHaveBeenCalled();
      expect(component.queryParams._page).toEqual(1);
      expect(component.queryParams._limit).toEqual(5);
    });
  });

  describe('#itemsSub', () => {
    it('should call setItems and push subscription to subscriptions[]', () => {
      const items: ItemModel[] = [itemMockModel];
      itemsFacade.items$ = of(items);
      spyOn(component, 'setItems');
      spyOn(component.subscriptions, 'push');
      component.itemsSub();
      expect(component.setItems).toHaveBeenCalledWith(items);
      expect(component.subscriptions.push).toHaveBeenCalled();
    });
  });

  describe('#setItems', () => {
    it('should set component.items', () => {
      const items: ItemModel[] = [itemMockModel];
      component.setItems(items);
      expect(component.items).toEqual(items);
      // Add more items
      component.setItems(items);
      expect(component.items).toEqual([...items]);
      // Empty items
      component.setItems([]);
      expect(component.items).toEqual([]);
    });
  });

  describe('#totalSub', () => {
    it('should call setTotal and push subscription to subscriptions[]', () => {
      const total: number = 20;
      itemsFacade.total$ = of(total);
      spyOn(component, 'setTotal');
      spyOn(component.subscriptions, 'push');
      component.totalSub();
      expect(component.setTotal).toHaveBeenCalledWith(total);
      expect(component.subscriptions.push).toHaveBeenCalled();
    });
  });

  describe('#setTotal', () => {
    it('should set component.toal', () => {
      const total: number = 20;
      component.setTotal(total);
      expect(component.total).toEqual(total);
      // Add diferent total
      component.setTotal(5);
      expect(component.total).toEqual(5);
    });

    it('should set component.toal 0 if is null', () => {
      component.setTotal(null);
      expect(component.total).toEqual(0);
    });
  });

  describe('#getAllItems', () => {
    it('should call itemsFacade.getAllItems with queryParams', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      spyOn(itemsFacade, 'getAllItems');
      component.getAllItems(queryParams);
      expect(itemsFacade.getAllItems).toHaveBeenCalledWith(queryParams);
    });
  });

  describe('#loadMore', () => {
    it('should call getAllItems and add +1 to page', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      component.queryParams = queryParams;
      component.total = 15;
      spyOn(component, 'getAllItems');
      component.loadMore();
      expect(component.getAllItems).toHaveBeenCalledWith(queryParams);
      expect(component.queryParams).toEqual({ _limit: 5, _page: 2 })
    });
    it('should don`t call getAllItems', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      component.queryParams = queryParams;
      component.items = [itemMockModel];
      component.total = 1;
      spyOn(component, 'getAllItems');
      component.loadMore();
      expect(component.getAllItems).not.toHaveBeenCalledWith(queryParams);
      expect(component.queryParams).toEqual({ _limit: 5, _page: 1 })
    });
  });

  describe('#clickToFavorite', () => {
    it('should call itemsFacade.addToFavorite and this.itemsFacade.setFavoriteProp', () => {
      spyOn(itemsFacade, 'addToFavorite');
      spyOn(itemsFacade, 'removeToFavorite');
      spyOn(itemsFacade, 'setFavoriteProp');
      component.items = [ itemMockModel ];
      component.clickToFavorite(itemMockModel);
      expect(itemsFacade.addToFavorite).toHaveBeenCalledWith(itemMockModel);
      expect(itemsFacade.removeToFavorite).not.toHaveBeenCalled();
      expect(itemsFacade.setFavoriteProp).toHaveBeenCalledWith([ itemMockModel ]);
    });
    it('should call itemsFacade.removeToFavorite and this.itemsFacade.setFavoriteProp', () => {
      spyOn(itemsFacade, 'addToFavorite');
      spyOn(itemsFacade, 'removeToFavorite');
      spyOn(itemsFacade, 'setFavoriteProp');
      component.items = [ itemMockModel ];
      const itemFav: ItemModel = { ...itemMockModel, favorite: true };
      component.clickToFavorite(itemFav);
      expect(itemsFacade.addToFavorite).not.toHaveBeenCalled();
      expect(itemsFacade.removeToFavorite).toHaveBeenCalledWith(itemFav);
      expect(itemsFacade.setFavoriteProp).toHaveBeenCalledWith([ itemMockModel ]);
    });
  });

});
