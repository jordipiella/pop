import { TestBed } from '@angular/core/testing';
import { ViewContainerRefMock } from '../../mocks/view-container-ref.mock';
import { ModalService } from './modal.service';
import { ComponentFactoryResolver, ComponentRef, ViewContainerRef, Compiler } from '@angular/core';
import { ComponentRefMock } from '../../mocks/component-ref.mock';
import { of } from 'rxjs';

const component: any = { component: 'component'};
const module: any = { module: 'module'};

describe('ModalService', () => {
  let service: ModalService;
  let factoryResolver: ComponentFactoryResolver;
  let compiler: Compiler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
    factoryResolver = TestBed.inject(ComponentFactoryResolver);
    compiler = TestBed.inject(Compiler);
  });

  describe('#openModal()', () => {
    it('should call', () => {
      const setSpy: jasmine.Spy = spyOnProperty(service, 'isOpen', 'set');
      service.openModal(component, module);
      expect(setSpy).toHaveBeenCalledWith(true);
      expect(service.component).toEqual(component);
      expect(service.module).toEqual(module);
    });
  })

  describe('#modalOpened()', () => {
    it('should call service.create component with ViewContainerRef, component, module', () => {
      service.component = component;
      service.module = module;
      const ref: ViewContainerRef = new ViewContainerRefMock();
      spyOn<any>(service, 'createComponent');
      service.modalOpened(ref);
      expect(service['createComponent']).toHaveBeenCalledWith(ref, component, module);
    });
    it('should don`t call service.create component', () => {
      spyOn<any>(service, 'createComponent');
      service.modalOpened(null);
      expect(service['createComponent']).not.toHaveBeenCalled();
    });
  });

  // describe('#createComponent()', () => {
  //   it('should call factoryResolver.resolveComponentFactory', () => {
  //     const ref: ViewContainerRef = new ViewContainerRefMock();
  //     const compRef: ComponentRefMock<any> = new ComponentRefMock();
  //     ref.createComponent = () => compRef;
  //     spyOn(factoryResolver, 'resolveComponentFactory');
  //     service['createComponent'](ref, component);
  //     expect(factoryResolver.resolveComponentFactory).toHaveBeenCalledWith(component);
  //   });
  // })
  // TODO:
  // describe('#createModule()', () => {
  //   it('should call factoryResolver.resolveComponentFactory', async () => {
  //     spyOn(compiler, 'compileModuleAsync').and.returnValue(of(module).toPromise())
  //     service['createModule'](module);
  //     expectAsync(compiler.compileModuleAsync).toBeResolved();
  //     expect(compiler.compileModuleAsync).toHaveBeenCalledWith(module);
  //   });
  // })

  describe('#closeModal()', () => {
    it('should call setter isOpen with false', () => {
      const setSpy: jasmine.Spy = spyOnProperty(service, 'isOpen', 'set');
      service.closeModal();
      expect(setSpy).toHaveBeenCalledWith(false);
    });
  })
});
