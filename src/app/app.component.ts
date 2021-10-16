import { Component, NgModuleFactory, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppFacade } from './core/services/app.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pop';
  component: any = null;
  module: NgModuleFactory<any> | undefined;

  constructor(
    private translate: TranslateService,
    private appFacade: AppFacade
    ) {

  }

  async ngOnInit(): Promise<void> {
    this.translate.setDefaultLang('en');
    this.title = this.translate.instant('header.title');
  }



}
