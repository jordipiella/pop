import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss'],
})
export class LoadMoreComponent {

  @Input() loading: boolean = false;
  @Input() text: string = '';

  @Output() clickLoadMore: EventEmitter<void> = new EventEmitter<void>();

  constructor(
  ) { }

  loadMore(): void {
    this.clickLoadMore.emit();
  }

}
