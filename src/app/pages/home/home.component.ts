import { Component } from '@angular/core';
import { FilterEnum } from '@core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  activeFilters: FilterEnum[] = [
    FilterEnum.sort,
    FilterEnum.search
  ];

  constructor() { }

}
