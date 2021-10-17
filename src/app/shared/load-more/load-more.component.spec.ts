import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadMoreComponent } from './load-more.component';



describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent;
  let fixture: ComponentFixture<LoadMoreComponent>;

  beforeEach(async() => {

    TestBed.configureTestingModule({
      declarations: [
        LoadMoreComponent,
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(LoadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#loadMore', () => {
    it('should call component.clickLoadMore.emit', () => {
      spyOn(component.clickLoadMore, 'emit');
      component.loadMore();
      expect(component.clickLoadMore.emit).toHaveBeenCalledTimes(1);
    });
  });

});
