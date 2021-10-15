import { Injectable } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ItemTranslator } from '../../translate/item.translator';
import { IApiResponse, ApiItemsService, IQueryParams, ItemContract } from '@api';

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
