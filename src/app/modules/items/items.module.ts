import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ItemsComponent } from './items.component';
import { httpLoaderFactory } from 'src/app/utils/http-loader.factory';
import * as fromItems from './state/items.reducer';
import { ItemsEffects } from './state/items.effects';
import { ItemsRoutingModule } from './items-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersModule } from '../../filters/filters.module';
import { ItemCardComponent } from './components/item-card/item-card.component';


@NgModule({
  declarations: [
    ItemsComponent,
    ItemCardComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forFeature(fromItems.itemsFeatureKey, fromItems.reducer),
    EffectsModule.forFeature([ItemsEffects]),
    SharedModule,
    FiltersModule,
    AngularSvgIconModule,
    ReactiveFormsModule
  ]
})
export class ItemsModule { }
