import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppFacade } from '../services/app.facade';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private appFacade: AppFacade,
    private translate: TranslateService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const title: string = this.translate.instant('error.title');
        const text: string = error?.message ? error.message : this.translate.instant('error.text');
        this.appFacade.errorAlert(title, text);
        return throwError(error);
      })
    )
  }

}
