import { Component } from '@angular/core';
import { AppFacade } from '../services/app.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  title: string = 'header.title';

  constructor(
    private appFacade: AppFacade
  ) { }

  openFavoriteModal(): void {
    this.appFacade.openFavoritesModal();
  }

}
