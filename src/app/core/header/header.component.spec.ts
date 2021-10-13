import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MockComponent } from '../mocks/mock-component';

describe('DropDownComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        MockComponent({ selector: 'svg-icon' })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#clickEvent', () => {
    it('should emit event with string', () => {
      spyOn(component.eventClick, 'emit');
      component.clickEvent('star');
      expect(component.eventClick.emit).toHaveBeenCalledWith('star')
    })
  })

});
