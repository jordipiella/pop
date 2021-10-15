import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ProductModel } from '../../../../core/models/product.model';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss'],
})
export class FavoriteCardComponent {

  @Input() favorite: ProductModel | undefined;
  @Output() clickToRemove: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  constructor(
  ) { }

  removeFavorite(favorite: ProductModel): void {
    this.clickToRemove.emit(favorite);
  }

}
