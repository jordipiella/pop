import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FavoriteModel } from '../../../../core/services/favorites/models/favorite.model';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss'],
})
export class FavoriteCardComponent {

  @Input() favorite: FavoriteModel | undefined;
  @Output() clickToRemove: EventEmitter<FavoriteModel> = new EventEmitter<FavoriteModel>();

  constructor(
  ) { }

  removeFavorite(favorite: FavoriteModel): void {
    this.clickToRemove.emit(favorite);
  }

}
