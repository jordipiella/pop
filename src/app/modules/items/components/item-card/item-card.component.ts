import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ItemModel } from '../../models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {

  @Input() item: ItemModel | undefined;
  @Output() clickToFavorite: EventEmitter<ItemModel> = new EventEmitter<ItemModel>();

  constructor(
  ) { }

  toFavorite(item: ItemModel): void {
    this.clickToFavorite.emit(item);
  }

}
