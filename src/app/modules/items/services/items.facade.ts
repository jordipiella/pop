import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQueryParams } from '../../api/interfaces/pagination.interface';
import { IApiResponse } from '../../api/interfaces/response.interface';
import { ItemsService } from './items/items.service';
import { ItemModel } from './items/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsFacade {

  constructor(
    private itemsService: ItemsService,
  ) { }

  getAllItems(queryParams?: IQueryParams): Observable<IApiResponse<ItemModel>> {
    return this.itemsService.getAll(queryParams);
  }

}
