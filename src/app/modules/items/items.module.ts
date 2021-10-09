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


@NgModule({
  declarations: [
    ItemsComponent
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
  ]
})
export class ItemsModule { }
