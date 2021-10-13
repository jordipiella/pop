import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef, Component } from '@angular/core';
import { filter, take, tap } from 'rxjs/operators';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  component: ComponentRef<ModalComponent> | undefined;

  constructor(
    private factoryResolver: ComponentFactoryResolver
  ) { }

  openModal(ref: ViewContainerRef, component: any): void {
    this.loadComponent(ref, component);
  }

  /**
  *  Start process to load modal, load component inside and detect close
  * @param ref ViewContainerRef
  * @param component Component
  */
  private async loadComponent(ref: ViewContainerRef, component: any): Promise<void> {
    const modalCompRef: ComponentRef<any> = await this.loadModalComponent(ref);
    this.component = modalCompRef;
    this.afterViewInitSub(modalCompRef, component);
    this.clickCloseSub(modalCompRef);
  }

  /**
   * Dynamic import modal and create component
   * @param ref ViewContainerRef
   * @returns
   */
  private async loadModalComponent(ref: ViewContainerRef): Promise<ComponentRef<any>> {
    const { ModalComponent } = await import('../../../shared/modal/modal.component');
    const componentRef: ComponentRef<any> = this.createComponent(ref, ModalComponent);
    return componentRef;
  }

  private createComponent(ref: ViewContainerRef, component: any): ComponentRef<any> {
    const factory: ComponentFactory<any> = this.factoryResolver.resolveComponentFactory(component);
    const componentRef: ComponentRef<any> = ref.createComponent(factory);
    return componentRef;
  }

  /**
   * Detect if Modal ngAfterViewInit of modal and create subComponent
   * @param compRef
   * @param component
   */
  private afterViewInitSub(compRef: ComponentRef<any>, component: any): void {
    compRef.instance.afterViewInit
      .pipe(
        take(1),
        tap(() => this.createComponent(compRef.instance.content, component))
      ).subscribe();
  }

  /**
   * Detect click close from modal
   * @param compRef ComponentRef<any>
   * @param ref ViewContainerRef
   */
  private clickCloseSub(compRef: ComponentRef<any>): void {
    compRef.instance.clickClose
      .pipe(
        tap(() => this.closeModal(compRef)),
        take(1)
      ).subscribe();
  }

  /**
   * Method to close Modal
   * @param ref ViewContainerRef
   */
  closeModal(compRef: ComponentRef<any>): void {
    compRef.instance.visible = false;
  }

}
