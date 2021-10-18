import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateResolver } from './core/resolvers/translate.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      routeResolver: TranslateResolver
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule)
      }

    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
