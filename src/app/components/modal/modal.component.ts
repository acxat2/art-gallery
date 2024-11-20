import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() public info!: string;
  @Input() public error: boolean = false;
  @Output() public outside = new EventEmitter<void>

  public clickOutside() {
    this.outside.emit()
  }
}
