import {
  Compiler,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  ViewContainerRef
} from '@angular/core';
import { NgModuleFactory } from '@angular/core/src/r3_symbols';
import { BehaviorSubject, Observable } from 'rxjs';
import { FavoritesModule } from 'src/app/favorites/favorites.module';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isOpen$: Observable<boolean> = this._isOpen.asObservable();

  component: ComponentRef<any> | undefined;
  module: ComponentRef<any> | undefined;

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private compiler: Compiler,
    private injector: Injector
  ) { }

  set isOpen(value: boolean) {
    this._isOpen.next(value)
  }

  openModal(component: any, module?: any): void {
    this.component = component;
    this.module = module;
    this.isOpen = true;
  }

  modalOpened(ref: ViewContainerRef | null): void {
    if (ref) {
      this.createComponent(ref, this.component, this.module);
    }
  }

  private async createComponent(ref: ViewContainerRef, component: any, module?: any): Promise<ComponentRef<any>> {
    await this.createModule(module);
    const factory: ComponentFactory<any> = this.factoryResolver.resolveComponentFactory(component);
    const componentRef: ComponentRef<any> = ref.createComponent(factory);
    return componentRef;
  }

  private async createModule(module?: any): Promise<void> {
    if (module) {
      const moduleFact: NgModuleFactory<any> =  await this.compiler.compileModuleAsync(FavoritesModule);
      moduleFact.create(this.injector);
    }
  }

  /**
   * Method to close Modal
   */
  closeModal(): void {
    this.isOpen = false;
  }

}


