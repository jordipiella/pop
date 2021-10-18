import { Injectable } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { FilterEnum } from '../../enums/filter.enum';
import { IFilter } from '../../interfaces/filter.interface';
import { IMap } from '../../interfaces/map.interface';
import { IFilterOption } from '../../interfaces/filter-option.interface';
import { SORT_OPTIONS } from '../../constants/sort-options.constants';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  _filterSelected: any = new Map();

  sortForm: FormControl = this.fb.control('');
  searchForm: FormControl = this.fb.control('');
  subscriptions: Subscription[] = [];
  sortByOptions: IFilterOption[] = SORT_OPTIONS;
  searchLoaded: boolean = false;
  sortLoaded: boolean = false;

  private _selectedFilters: BehaviorSubject<IFilter> = new BehaviorSubject({});
  selectedFilters$: Observable<IFilter> = this._selectedFilters.asObservable();


  constructor(
    private fb: FormBuilder
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
    if (this.searchLoaded) {
      return;
    }
    this.searchLoaded = true;
    const searchSub: Subscription = this.searchForm.valueChanges
      .pipe(
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
    if (this.sortLoaded) {
      return;
    }
    this.sortLoaded = true;
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
