import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FavoriteCardComponent } from './favorite-card.component';
import { MockComponent, favoriteMockModel } from '@core';


describe('FavoritesCardComponent', () => {
  let component: FavoriteCardComponent;
  let fixture: ComponentFixture<FavoriteCardComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        FavoriteCardComponent,
        MockComponent({ selector: 'app-card' })
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('#removeFavorite', () => {
    it('should call clickToRemove.emit', () => {
      spyOn(component.clickToRemove, 'emit');
      component.removeFavorite(favoriteMockModel);
      expect(component.clickToRemove.emit).toHaveBeenCalledWith(favoriteMockModel);
    });
  });

});

