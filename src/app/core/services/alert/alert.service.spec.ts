import { TestBed } from '@angular/core/testing';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';
import { SweetAlertOptions } from 'sweetalert2';

describe('AlertService', () => {
  let service: AlertService;
  const mockConfig: SweetAlertOptions = {
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 4000,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: []
    });
    service = TestBed.inject(AlertService);
  });

  describe('#swalMixin', () => {
    it('should call Swal.mixin with default config', () => {
      spyOn(Swal, 'mixin');
      service.defaultConfig = mockConfig;
      service.swalMixin();
      expect(Swal.mixin).toHaveBeenCalledWith(mockConfig);
    });
    it('should call Swal.mixin with custom config', () => {
      const customConfig: SweetAlertOptions = { position: 'top-end' };
      spyOn(Swal, 'mixin');
      service.swalMixin(customConfig);
      expect(Swal.mixin).toHaveBeenCalledWith(customConfig);
    });
  });

  describe('#fire', () => {
    it('should call service.swalMixin', () => {
      const spy: jasmine.Spy<any> = spyOn(service, 'swalMixin').and.returnValue({ fire: () => null });
      service.defaultConfig = mockConfig;
      service.fire('success', 'title', 'text');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('#success', () => {
    it('should call service.fire with success, title, text', () => {
      spyOn(service, 'fire')
      service.defaultConfig = mockConfig;
      service.success('title', 'text');
      expect(service.fire).toHaveBeenCalledWith('success', 'title', 'text');
    });
  });

  describe('#error', () => {
    it('should call service.fire with error, title, text', () => {
      spyOn(service, 'fire')
      service.defaultConfig = mockConfig;
      service.error('title', 'text');
      expect(service.fire).toHaveBeenCalledWith('error', 'title', 'text');
    });
  });

});
