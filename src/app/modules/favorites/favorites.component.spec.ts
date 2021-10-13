import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from '../../core/mocks/mock-component';
import { FavoritesComponent } from './favorites.component';

const initialState: unknown = {
  data: [],
  total: null,
  loading: false,
  error: null
};
const fb: FormBuilder = new FormBuilder();

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        FavoritesComponent,
        MockComponent({ selector: 'app-search', inputs:[ 'formControl', 'placeholder'] })
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        TranslateService,
        ReactiveFormsModule,
        FormBuilder,
        provideMockStore({ initialState: { items: initialState }})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.searchForm = fb.control('');
  }));

  describe('#ngOnInit', () => {
    it('should', () => {

    });
  });



});
