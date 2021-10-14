import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { throwError } from 'rxjs';

describe('ErrorIterceptor', () => {
  let errorInterceptor: ErrorInterceptor;
  let httpReq: HttpRequest<any>;
  let httpHandler: any;

  const error: any = {
    error: 'error',
    status: 500,
    name: 'HttpErrorResponse',
    message: '',
    ok: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        ErrorInterceptor
      ]
    });
    errorInterceptor = TestBed.inject(ErrorInterceptor);
  });

  describe('#getAll()', () => {
    it('should call return error', () => {
      httpReq = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
      httpHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
      httpHandler.handle.and.returnValue(throwError(error));
      errorInterceptor.intercept(httpReq, httpHandler)
        .subscribe(
          () => null,
          (err: HttpErrorResponse) => expect(err).toEqual(error)
        );
    });
  });

});
