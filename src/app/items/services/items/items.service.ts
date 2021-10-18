import { Injectable } from '@angular/core';
import { ItemModel } from '../../models/item.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ItemTranslator } from '../../translate/item.translator';
import { IApiResponse, ApiItemsService, IQueryParams, ItemContract } from 'src/app/items/api';
import { AppFacade } from '../../../core/services/app.facade';
import { ApiItemsParamsService } from '../../api/services/api-items-params/api-items-params.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private apiItems: ApiItemsService,
    private apiItemsParams: ApiItemsParamsService,
    private appFacade: AppFacade
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

  setFavoriteProp(items: ItemModel[] = []): ItemModel[] {
    const itemsF: ItemModel[] = items.map((item: ItemModel) => {
      const isFav: boolean = this.appFacade.isInFavorites(item);
      const newItem: ItemModel = { ...item, favorite: isFav };
      return newItem;
    });
    return itemsF;
  }

  get params(): IQueryParams {
    return this.apiItemsParams.params;
  }

  set params(value: IQueryParams) {
    this.apiItemsParams.params = value;
  }

  setSort(value: string): void {
   this.apiItemsParams.setSort(value);
  }

  removeSort(): void {
    this.apiItemsParams.removeSort();
  }

  setSearch(value: string): void {
    this.apiItemsParams.setSearch(value);
  }

  removeSearch(): void {
    this.apiItemsParams.removeSearch();
  }

  resetParams(): void {
    this.apiItemsParams.resetParams();
  }


}
