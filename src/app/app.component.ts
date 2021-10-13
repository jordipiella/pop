import { Compiler, Component, Injector, NgModuleFactory, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from './core/services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef }) modal!: ViewContainerRef;

  title = 'pop';
  component: any = null;
  module: NgModuleFactory<any> | undefined;

  constructor(
    private translate: TranslateService,
    private modalService: ModalService,
    private compiler: Compiler,
    private injector: Injector
    ) {

  }

  async ngOnInit(): Promise<void> {
    this.translate.setDefaultLang('en');
    this.title = this.translate.instant('header.title');
  }

  headerClick(event: string): void {
    switch (event) {
      case 'star':
        this.openFavoriteModal();
        break;
      default:
        break;
    }
  }

  async openFavoriteModal(): Promise<void> {
    const { FavoritesComponent } = await import('./modules/favorites/favorites.component');
    // TODO: Refactor and move to service
    const { FavoritesModule } = await import('./modules/favorites/favorites.module');
    this.module = await this.compiler.compileModuleAsync(FavoritesModule);
    const elementModuleRef = this.module.create(this.injector);
    if (this.modalService.component?.instance?.visible) {
      this.modalService.component.instance.visible = true;
      return;
    }
    this.modalService.openModal(this.modal, FavoritesComponent);
  }


}
