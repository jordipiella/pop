import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppFacade } from '../services/app.facade';

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
