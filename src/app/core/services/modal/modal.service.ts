import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { filter, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private factoryResolver: ComponentFactoryResolver
  ) { }

  openModal(ref: ViewContainerRef, component: unknown): void {
    this.loadComponent(ref, component);
  }

  async loadComponent(ref: ViewContainerRef, component: any): Promise<void> {
    const { ModalComponent } = await import('../../modal/modal.component');
    const factory = this.factoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = ref.createComponent(factory);
    const factory2 = this.factoryResolver.resolveComponentFactory(component);

    componentRef.instance.afterViewInit
      .pipe(
        take(1),
        tap(() => componentRef.instance.content.createComponent(factory2))
      ).subscribe();

    componentRef.instance.clickClose
      .pipe(
        tap(() => this.closeModal(ref)),
        take(1)
      ).subscribe();
  }

  closeModal(ref: ViewContainerRef): void {

    ref.remove();
  }


}
