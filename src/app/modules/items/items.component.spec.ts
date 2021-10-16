import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
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
        HttpClientTestingModule
      ],
      providers: [
        TranslateService,
        ReactiveFormsModule,
        FormBuilder,
        provideMockStore({ initialState: { items: initialState }})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    itemsFacade = TestBed.inject(ItemsFacade);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.sortForm = fb.control('');
  }));

  describe('#ngOnInit', () => {
    it('should call itemsSub, totalSub, sortSub, getAllItems', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      component.queryParams = queryParams;
      spyOn(component, 'itemsSub');
      spyOn(component, 'totalSub');
      spyOn(component, 'sortSub');
      spyOn(component, 'searchSub');
      spyOn(component, 'getAllItems');
      component.ngOnInit();
      expect(component.itemsSub).toHaveBeenCalled();
      expect(component.totalSub).toHaveBeenCalled();
      expect(component.sortSub).toHaveBeenCalled();
      expect(component.searchSub).toHaveBeenCalled();
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

  describe('#searchSub', () => {
    it('should call setSearch, resetList and getAllItems', fakeAsync(() => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      component.queryParams = queryParams
      spyOn(component, 'setSearch');
      spyOn(component, 'resetList');
      spyOn(component, 'getAllItems');
      spyOn(component.subscriptions, 'push');
      component.searchSub();
      component.searchForm.setValue('newSearch');
      tick(600);
      expect(component.setSearch).toHaveBeenCalledWith('newSearch');
      expect(component.resetList).toHaveBeenCalled();
      expect(component.getAllItems).toHaveBeenCalledWith(queryParams);
      expect(component.subscriptions.push).toHaveBeenCalled();
    }));
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

  describe('#sortSub', () => {
    it('should call setSort, resetList, getAllItems and push subscription to subscriptions[]', () => {
      const queryParams: IQueryParams = { _limit: 5, _page: 1 };
      spyOn(component, 'setSort');
      spyOn(component, 'resetList');
      spyOn(component, 'getAllItems');
      spyOn(component.subscriptions, 'push');
      component.sortSub();
      component.sortForm.setValue('name');
      expect(component.setSort).toHaveBeenCalledWith('name');
      expect(component.resetList).toHaveBeenCalled();
      expect(component.getAllItems).toHaveBeenCalledWith(queryParams);
      expect(component.subscriptions.push).toHaveBeenCalled();
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
      expect(component.items).toEqual([...items, ...items]);
      // Empty items
      component.setItems([]);
      expect(component.items).toEqual([...items, ...items]);
    });
    it('should set component.items when is null', () => {
      component.items = [];
      const items: ItemModel[] = [itemMockModel];
      component.setItems(null);
      expect(component.items).toEqual([]);
      // Add more items
      component.setItems(items);
      expect(component.items).toEqual(items);
      // Add more null items
      component.setItems(null);
      expect(component.items).toEqual(items);
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

});
