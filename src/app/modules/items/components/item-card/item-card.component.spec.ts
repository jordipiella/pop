import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemCardComponent } from './item-card.component';
import { MockComponent } from '@core';
import { itemMockModel } from '../../mocks/item-mock.model';


describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        ItemCardComponent,
        MockComponent({ selector: 'app-card' }),
        MockComponent({ selector: 'svg-icon' }),
        MockComponent({ selector: 'app-badge' })
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('#toFavorite', () => {
    it('should call clickToFavorite.emit', () => {
      spyOn(component.clickToFavorite, 'emit');
      component.toFavorite(itemMockModel);
      expect(component.clickToFavorite.emit).toHaveBeenCalledWith(itemMockModel);
    });
  });

});

