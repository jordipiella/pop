import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { AppFacade } from '../services/app.facade';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  title: string = '';

  constructor(
    private appFacade: AppFacade,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.title = this.translate.instant('header.title');
  }

  openFavoriteModal(): void {
    this.appFacade.openFavoritesModal();
  }

}
