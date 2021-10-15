import { Injectable } from '@angular/core';
import { ApiItemsService } from '@api';
import { IQueryParams } from '../../../api/interfaces/pagination.interface';
import { ItemModel } from '../../models/item.model';
import { ItemContract } from '../../../api/services/api-items/contracts/item.contract';
import { map } from 'rxjs/operators';
import { IApiResponse } from '@api';
import { Observable } from 'rxjs';
import { ItemTranslator } from '../../translate/item.translator';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private apiItems: ApiItemsService
  ) { }

  getAll(queryParams?: IQueryParams): Observable<IApiResponse<ItemModel>> {
    return this.apiItems.getAll(queryParams)
      .pipe(
        map((apiRes: IApiResponse<ItemContract>) => {
          if (apiRes?.data?.length) {
            apiRes.data = apiRes.data.map((x: ItemContract) => ItemTranslator.translateContractToModel(x));
          }
          return { ...apiRes } as IApiResponse<ItemModel>;
        })
      );
  }
}
