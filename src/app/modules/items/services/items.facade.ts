import { Injectable } from '@angular/core';
import { ApiItemsService } from '../../api/services/api-items/api-items.service';
import { IQueryParams } from '../../api/interfaces/pagination.interface';
import { IApiResponse } from '../../api/interfaces/response.interface';
import { ItemContract } from '../../api/services/api-items/contracts/item.contract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsFacade {

  constructor(
    private apiItems: ApiItemsService,
  ) { }

  getAllItems(queryParams?: IQueryParams): Observable<IApiResponse<ItemContract>> {
    return this.apiItems.getAll(queryParams);
  }

}
