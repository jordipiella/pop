import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TooltipComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#setIsTooltipVisible', () => {
    it('set value to true', () => {
      component.isTooltipVisible = false;
      component.setIsTooltipVisible(true);
      expect(component.isTooltipVisible).toBeTrue();
    });
    it('set value to false', () => {
      component.isTooltipVisible = true;
      component.setIsTooltipVisible(false);
      expect(component.isTooltipVisible).toBeFalse();
    });
  });

});
