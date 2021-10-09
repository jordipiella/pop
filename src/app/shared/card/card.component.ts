import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @ContentChild('image', { read: TemplateRef }) image!: TemplateRef<any>;
  @ContentChild('body', { read: TemplateRef }) body!: TemplateRef<any>;

  constructor(
  ) { }

  ngOnInit(): void {}

}
