import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() title: string = '';
  @Output() eventClick: EventEmitter<string> = new EventEmitter<string>();

  constructor(
  ) { }

  clickEvent(value: string): void {
    this.eventClick.emit(value)
  }

}
