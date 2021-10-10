import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownComponent } from './dropdown.component';

describe('SortComponent', () => {
  let component: DropDownComponent;
  let fixture: ComponentFixture<DropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
