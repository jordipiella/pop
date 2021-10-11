import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from './core/services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', { read: ViewContainerRef }) modal!: ViewContainerRef;

  title = 'pop';
  constructor(
    private translate: TranslateService,
    private modalService: ModalService
    ) {

  }

  async ngOnInit(): Promise<void> {
    this.translate.setDefaultLang('en');

  }

  async ngAfterViewInit(): Promise<void> {
    const { ButtonComponent } = await import('./shared/button/button.component');
    this.modalService.openModal(this.modal, ButtonComponent);
  }


}
