import { TestBed } from '@angular/core/testing';
import { ViewContainerRefMock } from '../../mocks/view-container-ref.mock';
import { ModalService } from './modal.service';
import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { ComponentRefMock } from '../../mocks/component-ref.mock';
import { of } from 'rxjs';

const component: any = { component: 'component'};
class CompRefMock {
  get instance() {
    return {
      afterViewInit : this.afterViewInit,
      clickClose : this.clickClose
    };
  }
  get afterViewInit() {
    return of(true);
  }
  get content() {
    return 'content';
  }
  get clickClose() {
    return of(true);
  }
}

describe('ModalService', () => {
  let service: ModalService;
  let factoryResolver: ComponentFactoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
    factoryResolver = TestBed.inject(ComponentFactoryResolver);
  });

  describe('#openModal()', () => {
    it('should call loadComponent with ref and component', () => {
      spyOn<any>(service, 'loadComponent');
      const ref: ViewContainerRef = new ViewContainerRefMock();
      service.openModal(ref, component);
      expect(service['loadComponent']).toHaveBeenCalledWith(ref, component);
    });
  })

  describe('#loadComponent()', () => {
    it('should call loadModalComponent, afterViewInitSub and clickCloseSub', async () => {
      const compRef: ComponentRefMock<any> = new ComponentRefMock();
      const ref: ViewContainerRef = new ViewContainerRefMock();
      spyOn<any>(service, 'afterViewInitSub');
      spyOn<any>(service, 'clickCloseSub');
      spyOn<any>(service, 'loadModalComponent').and.returnValue(of(compRef).toPromise());
      await service['loadComponent'](ref, component);
      expect(service['loadModalComponent']).toHaveBeenCalledWith(ref);
      expect(service['afterViewInitSub']).toHaveBeenCalledWith(compRef, component);
      expect(service['clickCloseSub']).toHaveBeenCalledWith(compRef, ref);
    });
  })

  describe('#loadModalComponent()', () => {
    it('should call createComponent', async () => {
      const { ModalComponent } = await import('../../modal/modal.component');
      const ref: ViewContainerRef = new ViewContainerRefMock();
      const compRef: ComponentRefMock<any> = new ComponentRefMock();
      spyOn<any>(service, 'createComponent').and.returnValue(of(compRef).toPromise());
      const result: ComponentRef<any> = await service['loadModalComponent'](ref);
      expect(service['createComponent']).toHaveBeenCalledWith(ref, ModalComponent);
      expect(result).toEqual(compRef);
    });
  })

  describe('#createComponent()', () => {
    it('should call factoryResolver.resolveComponentFactory', () => {
      const ref: ViewContainerRef = new ViewContainerRefMock();
      const compRef: ComponentRefMock<any> = new ComponentRefMock();
      ref.createComponent = () => compRef;
      spyOn(factoryResolver, 'resolveComponentFactory');
      service['createComponent'](ref, component);
      expect(factoryResolver.resolveComponentFactory).toHaveBeenCalledWith(component);
    });
  })

  describe('#afterViewInitSub()', () => {
    it('should call service.createComponent with compRef.instance.content, component', () => {
      const ref: ViewContainerRef = new ViewContainerRefMock();
      const compRef: any = new CompRefMock();
      spyOn<any>(service, 'createComponent');
      service['afterViewInitSub'](compRef, component);
      expect(service['createComponent']).toHaveBeenCalledWith(compRef.instance.content, component);
    });
  })

  describe('#clickCloseSub()', () => {
    it('shouldcall service.closeModal', () => {
      const ref: ViewContainerRef = new ViewContainerRefMock();
      const compRef: any = new CompRefMock();
      spyOn(service, 'closeModal');
      service['clickCloseSub'](compRef, ref);
      expect(service['closeModal']).toHaveBeenCalledWith(ref);
    });
  })

  describe('#closeModal()', () => {
    it('should call ref.remove', () => {
      const ref: ViewContainerRef = new ViewContainerRefMock();
      spyOn(ref, 'remove');
      service.closeModal(ref);
      expect(ref.remove).toHaveBeenCalledWith();
    });
  })
});
