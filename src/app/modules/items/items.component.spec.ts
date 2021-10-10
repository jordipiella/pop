import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { IQueryParams } from '@api';
import { ItemsComponent } from './items.component';
import { ItemsFacade } from './services/items.facade';
import { itemMockModel } from './services/items/mocks/item-mock.model';
import { ItemModel } from './services/items/models/item.model';

const initialState: unknown = {
  data: [],
  total: null,
  loading: false,
  error: null
};

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let itemsFacade: ItemsFacade;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        ItemsComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        TranslateService,
        provideMockStore({ initialState: { items: initialState }})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    itemsFacade = TestBed.inject(ItemsFacade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('#ngOnInit', () => {
    it('should call loadingSubscription, getMovieId and getMovie', () => {
      spyOn(component, 'itemsSub');
      spyOn(component, 'totalSub');
      spyOn(component, 'getAllItems');
      const queryParams: IQueryParams = { _limit: 5, _page: 0 };
      component.ngOnInit();
      expect(component.itemsSub).toHaveBeenCalled();
      expect(component.totalSub).toHaveBeenCalled();
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
