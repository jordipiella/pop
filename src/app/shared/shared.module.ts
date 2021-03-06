import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from '../utils/http-loader.factory';
import { ButtonComponent } from './button/button.component';
import { GridComponent } from './grid/grid.component';
import { BadgeComponent } from './badge/badge.component';
import { DropDownComponent } from './dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SkeletonCardComponent } from './skeleton-card/skeleton-card.component';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';


@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent,
    GridComponent,
    BadgeComponent,
    DropDownComponent,
    SearchComponent,
    LoadMoreComponent,
    TooltipComponent,
    SkeletonCardComponent,
    NumberToArrayPipe
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
  ],
  exports: [
    CardComponent,
    ButtonComponent,
    GridComponent,
    BadgeComponent,
    DropDownComponent,
    SearchComponent,
    LoadMoreComponent,
    TooltipComponent,
    SkeletonCardComponent,
    NumberToArrayPipe
  ]
})
export class SharedModule { }
