import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiItemsService } from './services/api-items/api-items.service';
import { ApiItemsParamsService } from './services/api-items-params/api-items-params.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiItemsService,
    ApiItemsParamsService
  ]
})
export class ApiModule { }
