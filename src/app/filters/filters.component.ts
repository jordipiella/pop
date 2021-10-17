import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppFacade, FilterEnum, IFilterOption } from '@core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  @ViewChild('empty') empty!: TemplateRef<any>;
  @ViewChild('sort') sort!: TemplateRef<any>;
  @ViewChild('search') search!: TemplateRef<any>;

  @Input() filtersConfig: FilterEnum[] = [];
  FilterEnum = FilterEnum;
  sortByOptions: IFilterOption[] = [];

  constructor(
    private appFacade: AppFacade,
    private translate: TranslateService
  ) {
  }

  getTemplate(template: FilterEnum): TemplateRef<any> {
    switch (template) {
      case FilterEnum.search:
        this.appFacade.loadFilter(FilterEnum.search);
        return this.search;
        case FilterEnum.sort:
          this.setSortByOptions();
          this.appFacade.loadFilter(FilterEnum.sort);
        return this.sort;
      default:
        return this.empty;
    }
  }

  getControl(controlName: FilterEnum): FormControl {
    return this.appFacade.getControl(controlName);
  }

  setSortByOptions(): void {
    const options: IFilterOption[] = this.appFacade.getSortByOptions();
    this.sortByOptions = options.map((option: IFilterOption) => {
      option.label = this.translate.instant(option.label);
      return option;
    });
  }

}
