import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { modalAnimation } from '../animations/animations.constants';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [ modalAnimation ]
})
export class ModalComponent implements OnInit {

  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
  ) { }

  ngOnInit(): void {}

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
