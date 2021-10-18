import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  defaultConfig: SweetAlertOptions = {
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 4000,
  };

  constructor() {}

  swalMixin(config: SweetAlertOptions | null = null): any {
    const useConfig: SweetAlertOptions = (config) ? config : this.defaultConfig;
    return Swal.mixin(useConfig);
  }

  fire(icon: SweetAlertIcon, title: string, text: string): void {
    const Toast: any = this.swalMixin();
    Toast.fire({ icon, title, text });
  }

  success(title: string, text: string): void {
    this.fire('success', title, text);
  }

  error(title: string, text: string): void {
    this.fire('error', title, text);
  }

}
