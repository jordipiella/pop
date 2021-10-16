import { EventEmitter, Injectable } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { FilterEnum } from '../../enums/filter.enum';
import { IFilter } from '../../interfaces/filter.interface';
import { IMap } from '../../interfaces/map.interface';
import { IFilterOption } from '../../interfaces/filter-option.interface';





@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  _filterSelected: any = new Map();

  sortForm: FormControl = this.fb.control('');
  searchForm: FormControl = this.fb.control('');
  subscriptions: Subscription[] = [];
  sortByOptions: IFilterOption[] = [
    { label: this.translate.instant('filters.sort.title'), value: 'title' },
    { label: this.translate.instant('filters.sort.description'), value: 'description' },
    { label: this.translate.instant('filters.sort.price'), value: 'price' },
    { label: this.translate.instant('filters.sort.email'), value: 'email' }
  ];

  private _selectedFilters: BehaviorSubject<IFilter> = new BehaviorSubject({});
  selectedFilters$: Observable<IFilter> = this._selectedFilters.asObservable();


  constructor(
    private fb: FormBuilder,
    private translate: TranslateService
  ) { }

  set filterSelected(val: IMap) {
    const { key, value } = val;
    this._filterSelected.set(key, value);
  }

  set selectedFilters(value: any) {
    this._selectedFilters.next(value);
  }


  loadFilter(filter: FilterEnum): void {
    switch (filter) {
      case FilterEnum.search:
        this.searchSub();
        break;
      case FilterEnum.sort:
        this.sortSub();
        break;
    }
  }

  searchSub(): void {
    const searchSub: Subscription = this.searchForm.valueChanges
      .pipe(
        filter((value: string) => value.length > 2 || !value),
        debounceTime(500),
        distinctUntilChanged(),
        tap((value: string) => this.setSelected(FilterEnum.search, value)),
      ).subscribe();
    this.subscriptions.push(searchSub);
  }

  setSelected(key: FilterEnum, value: string): void {
    this.filterSelected = { key, value };
    const filtersObject: any =  Object.fromEntries(this._filterSelected);
    this.selectedFilters = filtersObject;
  }

  sortSub(): void {
    const sortSub: Subscription = this.sortForm.valueChanges
      .pipe(
        tap((value: string) => this.setSelected(FilterEnum.sort, value)),
      ).subscribe();
    this.subscriptions.push(sortSub);
  }

  getControl(controlName: FilterEnum): FormControl {
    switch (controlName) {
      case FilterEnum.search:
        return this.searchForm;
      case FilterEnum.sort:
        return this.sortForm;;
      default:
        return this.fb.control('');
    }
  }

}
