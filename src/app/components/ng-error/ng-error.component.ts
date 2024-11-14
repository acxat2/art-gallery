import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-error.component.html',
  styleUrls: ['./ng-error.component.scss']
})
export class NgErrorComponent {
  @Input() message = '';

}
