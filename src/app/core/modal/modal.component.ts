import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { modalAnimation } from '../../shared/animations/animations.constants';
import { tap } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppFacade } from '../services/app.facade';

@Component({

  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [ modalAnimation ]
})
export class ModalComponent implements AfterViewInit, OnDestroy {

  @ViewChild('content', { read: ViewContainerRef }) content!: ViewContainerRef;

  isVisible: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private appFacade: AppFacade
  ) { }

  ngAfterViewInit(): void {
    this.isOpenSubs();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  isOpenSubs(): void {
    this.appFacade.isOpen$.pipe(
      tap((isOpen: boolean) => this.setIsVisible(isOpen)),
      tap((isOpen: boolean) => this.modalBehaviour(isOpen, this.content))
    ).subscribe();
  }

  modalBehaviour(isOpen: boolean, ref: ViewContainerRef): void {
    if (!isOpen) {
      return;
    }
    // Wait for content
    setTimeout(() => {
      this.modalOpened(ref);
    }, 100);
  }

  modalOpened(content: ViewContainerRef | null): void {
    if (content) {
      this.appFacade.modalOpened(content);
    }
  }

  setIsVisible(value: boolean): void {
    this.isVisible = (value) ? true : false;
  }

  close(): void {
    this.appFacade.closeModal();
  }

}
