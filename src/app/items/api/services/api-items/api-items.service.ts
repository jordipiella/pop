import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItemContract } from '../../contracts/item.contract';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { IQueryParams } from '../../interfaces/query-params.interface';
import { IApiResponse } from '../../interfaces/response.interface';
import { API_ITEMS_URL, API_DEFAULT_PAGE, API_DEFAULT_LIMIT } from 'src/app/items/api';

@Injectable({
  providedIn: 'root'
})
export class ApiItemsService {

  defaultQueryParams: IQueryParams = {
    _limit: API_DEFAULT_LIMIT,
    _page: API_DEFAULT_PAGE,
  };

  constructor(
    private http: HttpClient
  ) { }

  getAll(queryParams: IQueryParams = this.defaultQueryParams): Observable<IApiResponse<ItemContract>> {
    const params: HttpParams = new HttpParams({
      fromObject: { ...queryParams }
    });
    return this.http.get(`${ environment.apiItemsUrl }/${ API_ITEMS_URL }`, { params, observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => this.httpResToApiResponse(res))
      );
  }

  httpResToApiResponse(res: HttpResponse<ItemContract[]>): IApiResponse<ItemContract> {
    const total: string | null = res?.headers?.get('X-Total-Count');
    const apiRes: IApiResponse<ItemContract> = {
      total: total ? parseInt(total) : null,
      data: res.body as ItemContract[]
    };
    return apiRes;
  }

}
