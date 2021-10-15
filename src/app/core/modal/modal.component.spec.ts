import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from './modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from '../mocks/mock-component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        ModalComponent,
        MockComponent({ selector: 'svg-icon', inputs: ['svgStyle']})
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        TranslateService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('#ngAfterViewInit', () => {
    it('should call afterViewInit.emit with true', () => {
      spyOn(component.afterViewInit, 'emit');
      component.ngAfterViewInit();
      expect(component.afterViewInit.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('#close', () => {
    it('should call clickClose.emit with true', () => {
      spyOn(component.clickClose, 'emit');
      component.close();
      expect(component.clickClose.emit).toHaveBeenCalledWith(true);
    });
  });

});
