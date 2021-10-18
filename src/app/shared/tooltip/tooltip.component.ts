import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {

  @Input() isTooltipVisible: boolean = false;

  @ContentChild('content', { read: TemplateRef }) content!: TemplateRef<any>;
  @ContentChild('element', { read: TemplateRef }) element!: TemplateRef<any>;

  constructor(
  ) { }

  setIsTooltipVisible(value: boolean): void {
    this.isTooltipVisible = value;
  }


}
