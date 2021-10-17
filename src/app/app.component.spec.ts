import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockComponent } from './core/mocks/mock-component';
import { ModalService } from './core/services/modal/modal.service';
import { provideMockStore } from '@ngrx/store/testing';
import { FormBuilder } from '@angular/forms';

const initialState: unknown = {
  data: []
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        MockComponent({ selector: 'app-header' }),
        MockComponent({ selector: 'app-modal' })
      ],
      providers: [
        FormBuilder,
        provideMockStore({ initialState: { favorites: initialState } })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

});
