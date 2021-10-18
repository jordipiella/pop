import { ComponentRef } from '@angular/core';
import { of } from 'rxjs';

export class ComponentRefMock<C> extends ComponentRef<C> {
  get location(): import('@angular/core').ElementRef<any> {
    throw new Error('Method not implemented.');
  }

  get injector(): import('@angular/core').Injector {
    throw new Error('Method not implemented.');
  }

  get instance(): C {
    throw new Error('Method not implemented.');
  }

  get hostView(): import('@angular/core').ViewRef {
    throw new Error('Method not implemented.');
  }
  get changeDetectorRef(): import('@angular/core').ChangeDetectorRef {
    throw new Error('Method not implemented.');
  };

  get componentType(): import('@angular/core').Type<any> {
    throw new Error('Method not implemented.');
  };

  destroy(): void {
    throw new Error('Method not implemented.');

  };

  onDestroy(callback: Function): void {
    throw new Error('Method not implemented.');
  };

}
