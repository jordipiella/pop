import { Component, OnInit } from '@angular/core';
import { AppFacade } from '../services/app.facade';
import { TranslateService } from '@ngx-translate/core';
import { EN_LANG } from '../constants/languages.constants';
import { take, tap, delay, filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  title!: string;

  constructor(
    private appFacade: AppFacade,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle(): void {
    // Wait translations
    this.translate.getTranslation(EN_LANG)
      .pipe(
        filter((res: any) => res?.header?.title),
        tap((res: any) => this.title = res?.header?.title),
        take(1)
      ).subscribe();
  }

  openFavoriteModal(): void {
    this.appFacade.openFavoritesModal();
  }

}
