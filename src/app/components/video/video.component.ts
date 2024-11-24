import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  template: `
    <video width='auto' height={{hight}} controls poster={{poster}}>
      <source src={{src}}>
    </video>

  `,
  styles: ``
})
export class VideoComponent {
  @Input() public src = '';
  @Input() public hight = 400;
  @Input() public poster = '';

  constructor() {
  }
}
