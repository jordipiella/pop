import { TestBed } from '@angular/core/testing';
import { ViewContainerRefMock } from '../../mocks/view-container-ref.mock';
import { ModalService } from './modal.service';
import { ComponentFactoryResolver, ViewContainerRef, Compiler } from '@angular/core';

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

  describe('#closeModal()', () => {
    it('should call setter isOpen with false', () => {
      const setSpy: jasmine.Spy = spyOnProperty(service, 'isOpen', 'set');
      service.closeModal();
      expect(setSpy).toHaveBeenCalledWith(false);
    });
  });

});
