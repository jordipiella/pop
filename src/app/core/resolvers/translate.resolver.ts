import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { EN_LANG } from '../constants/languages.constants';



@Injectable({
  providedIn: 'root'
})
export class TranslateResolver implements Resolve<any> {

  constructor(
    private translate: TranslateService
  ) { }

  resolve(): Observable<any> {
    this.translate.setDefaultLang(EN_LANG);
    return this.translate.getTranslation(EN_LANG);
  }


}
