import {
  trigger,
  transition,
  style,
  animate,
  AnimationTriggerMetadata
} from "@angular/animations";

export const modalAnimation: AnimationTriggerMetadata[] = [
  trigger('modal', [
    transition('void => *', [
      style({ opacity: 0, transform: 'scale3d(.9, .9, .9)' }),
      animate(400)
    ]),
    transition('* => void', [
      animate(200, style({ opacity: 0, transform: 'scale3d(.6, .6, .6)' }))
    ])
  ])
];
