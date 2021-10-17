import { Component, NgModuleFactory } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  component: any = null;
  module: NgModuleFactory<any> | undefined;

  constructor() {}

}
