import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FiltersService } from './filters.service';


describe('FiltersService', () => {
  let service: FiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: []
    });
    service = TestBed.inject(FiltersService);
  });

});
