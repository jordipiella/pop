import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { modalAnimation } from '../../shared/animations/animations.constants';
import { tap, delay } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppFacade } from '../services/app.facade';

@Component({

  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [ modalAnimation ]
})
export class ModalComponent implements OnInit, OnDestroy {

  @ViewChild('content', { read: ViewContainerRef }) content!: ViewContainerRef;

  isVisible: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private appFacade: AppFacade
  ) { }

  ngOnInit(): void {
    this.isOpenSubs();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  isOpenSubs(): void {
    this.appFacade.isOpen$.pipe(
      tap((isOpen: boolean) => this.setIsVisible(isOpen)),
      delay(50),
      tap((isOpen: boolean) => this.modalBehaviour(isOpen, this.content))
    ).subscribe();
  }

  modalBehaviour(isOpen: boolean, content: ViewContainerRef): void {
    if (!isOpen) {
      return;
    }
    this.modalOpened(content);
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
