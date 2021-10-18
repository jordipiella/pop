import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { throwError } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppFacade } from '@core';
import * as fromFavorites from '../state/favorites/favorites.reducer';
import { StoreModule } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';

describe('ErrorIterceptor', () => {
  let errorInterceptor: ErrorInterceptor;
  let httpReq: HttpRequest<any>;
  let httpHandler: any;
  let translate: TranslateService;
  let appFacade: AppFacade;

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
        RouterTestingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(fromFavorites.reducer),
      ],
      providers: [
        FormBuilder,
        ErrorInterceptor
      ]
    });
    errorInterceptor = TestBed.inject(ErrorInterceptor);
    translate = TestBed.inject(TranslateService);
    appFacade = TestBed.inject(AppFacade);
  });

  describe('#intercept()', () => {
    it('should return error and call errorAlert, and translate with error.text and error.title', () => {
      httpReq = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
      httpHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
      httpHandler.handle.and.returnValue(throwError(error));
      spyOn(translate, 'instant').and.returnValue('string');
      spyOn(appFacade, 'errorAlert')
      errorInterceptor.intercept(httpReq, httpHandler)
        .subscribe(
          () => null,
          (err: HttpErrorResponse) => {
            expect(err).toEqual(error);
            expect(translate.instant).toHaveBeenCalledWith('error.title');
            expect(translate.instant).toHaveBeenCalledWith('error.text');
            expect(translate.instant).toHaveBeenCalledTimes(2);
            expect(appFacade.errorAlert).toHaveBeenCalledWith('string', 'string');
          }
        );
    });
    it('should return error and call errorAlert, and translate with error.text and message from error', () => {
      const errorWithM: any = { ...error };
      errorWithM.message = 'Message';
      httpReq = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
      httpHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
      httpHandler.handle.and.returnValue(throwError(errorWithM));
      spyOn(translate, 'instant').and.returnValue('string');
      spyOn(appFacade, 'errorAlert')
      errorInterceptor.intercept(httpReq, httpHandler)
        .subscribe(
          () => null,
          (err: HttpErrorResponse) => {
            expect(err).toEqual(errorWithM);
            expect(translate.instant).toHaveBeenCalledWith('error.title');
            expect(appFacade.errorAlert).toHaveBeenCalledWith('string', 'Message');
          }
        );
    });
  });

});
