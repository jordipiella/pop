import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FavoritesComponent } from './favorites.component';
import { of } from 'rxjs';
import { favoriteMockModel, MockComponent, FavoriteModel } from '@core';
import { FavoritesFacade } from './services/favorite.facade';

const initialState: unknown = {
  data: []
};

const fb: FormBuilder = new FormBuilder();

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favFacade: FavoritesFacade;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        FavoritesComponent,
        MockComponent({ selector: 'app-search', inputs:[ 'formControl', 'placeholder'] }),
        MockComponent({ selector: 'app-grid' })
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        TranslateService,
        ReactiveFormsModule,
        FormBuilder,
        provideMockStore({ initialState: { favorites: initialState }})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    favFacade = TestBed.inject(FavoritesFacade);
    component.searchForm = fb.control('');
  }));

  describe('#ngAfterViewInit', () => {
    it('should call getFavorites and searchSub', () => {
      spyOn(component, 'getFavorites');
      spyOn(component, 'searchSub');
      component.ngAfterViewInit();
      expect(component.getFavorites).toHaveBeenCalled();
      expect(component.searchSub).toHaveBeenCalled();
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

  describe('#getFavorites', () => {
    it('should ', fakeAsync(() => {
      spyOnProperty(favFacade, 'favorites$', 'get').and.returnValue(of([ favoriteMockModel ]));
      spyOn(component, 'setFavorites');
      spyOn(component, 'setSearch');
      component.getFavorites();
      tick(10);
      expect(component.setFavorites).toHaveBeenCalledWith([ favoriteMockModel ]);
      expect(component.setSearch).toHaveBeenCalledWith('');
    }));
  });

  describe('#setFavorites', () => {
    it('should set favorites and AllFavorites ', () => {
      const favArray: FavoriteModel[] = [ favoriteMockModel ];
      component.favorites = [];
      component.allFavorites = [];
      component.setFavorites(favArray);
      expect(component.favorites).toEqual(favArray);
      expect(component.allFavorites).toEqual(favArray);
    });
  });

  describe('#searchSub', () => {
    it('should call setSearch and subscriptions.push ', fakeAsync(() => {
      spyOn(component, 'setSearch');
      spyOn(component.subscriptions, 'push');
      component.searchSub();
      component.searchForm.setValue('newValue');
      tick(600);
      expect(component.setSearch).toHaveBeenCalledWith('newValue');
      expect(component.subscriptions.push).toHaveBeenCalled();
    }));
  });

  describe('#setSearch', () => {
    it('should call set favorites if value is ``', () => {
      const favArray: FavoriteModel[] = [ favoriteMockModel ];
      component.allFavorites = favArray;
      spyOn(component, 'setFavorites');
      spyOn(component, 'filterFavorites');
      component.setSearch('');
      expect(component.setFavorites).toHaveBeenCalledWith(favArray);
      expect(component.filterFavorites).not.toHaveBeenCalled();
    });
    it('should call filterFavorites if value isn`t ``', () => {
      const favArray: FavoriteModel[] = [ favoriteMockModel ];
      component.allFavorites = favArray;
      spyOn(component, 'setFavorites');
      spyOn(component, 'filterFavorites');
      component.setSearch('search');
      expect(component.setFavorites).not.toHaveBeenCalledWith(favArray);
      expect(component.filterFavorites).toHaveBeenCalledWith(favArray, 'search');
    });
  });

  describe('#filterFavorites', () => {
    it('should return favoriteModel[] filtered by title', () => {
      const favArray: FavoriteModel[] = [ favoriteMockModel ];
      expect(component.filterFavorites(favArray, 'Cá')).toEqual(favArray);
      expect(component.filterFavorites(favArray, 'casc')).toEqual(favArray);
      expect(component.filterFavorites(favArray, 'cÀ')).toEqual(favArray);
      expect(component.filterFavorites(favArray, 'Coche')).toEqual([]);
      expect(component.filterFavorites([], 'Coche')).toEqual([]);
      expect(component.filterFavorites([], '')).toEqual([]);
    });
  });

  describe('#removeFavorite', () => {
    it('should call favoritesFacade.removeFavorite', () => {
      spyOn(favFacade, 'removeFavorite');
      component.removeFavorite(favoriteMockModel);
      expect(favFacade.removeFavorite).toHaveBeenCalledWith(favoriteMockModel);
    });
  });



});
