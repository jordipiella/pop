import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IQueryParams } from '../../interfaces/query-params.interface';
import { API_DEFAULT_PAGE, API_DEFAULT_LIMIT, OrderEnum } from 'src/app/items/api';

@Injectable({
  providedIn: 'root'
})
export class ApiItemsParamsService {

  defaultQueryParams: IQueryParams = {
    _limit: API_DEFAULT_LIMIT,
    _page: API_DEFAULT_PAGE,
  };

  private _paramsSubject: BehaviorSubject<IQueryParams> = new BehaviorSubject(this.defaultQueryParams);
  params$: Observable<IQueryParams> = this._paramsSubject.asObservable();

  constructor(
  ) { }

  get params(): IQueryParams {
    return this._paramsSubject.value;
  }

  set params(value: IQueryParams) {
    this._paramsSubject.next(value);
  }

  setSort(value: string): void {
    const params: IQueryParams = this.params;
    if (!value || value === null) {
      this.removeSort();
      return;
    }
    params._sort = value;
    params._order = OrderEnum.asc;
    this.params = params;
  }

  removeSort(): void {
    const params: IQueryParams = this.params;
    delete params._order;
    delete params._sort;
    this.params = params;
  }

  setSearch(value: string): void {
    const params: IQueryParams = this.params;
    if (!value) {
      this.removeSearch();
      return;
    }
    params.q = value;
    this.params = params;
  }

  removeSearch(): void {
    const params: IQueryParams = this.params;
    delete params.q;
    this.params = params;
  }

  resetParams(): void {
    this.params = this.defaultQueryParams;
  }

}
