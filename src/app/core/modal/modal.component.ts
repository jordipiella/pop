import {
  AfterViewInit,
  Component,
  EventEmitter,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { modalAnimation } from '../../shared/animations/animations.constants';

@Component({

  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [ modalAnimation ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { '[@modal]': 'in' }
})
export class ModalComponent implements AfterViewInit {

  clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  afterViewInit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('content', { read: ViewContainerRef }) content!: ViewContainerRef;

  constructor(
  ) { }

  ngAfterViewInit(): void {
    this.afterViewInit.emit(true);
  }

  close(): void {
    this.clickClose.emit(true);
  }

}
