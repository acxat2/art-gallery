import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
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
  @Input() public top: number = 0;
  @Input() public out: boolean = false;
  @Input() public confirmIn: boolean = false;
  @Output() public outside = new EventEmitter<void>
  @Output() public confirmOut = new EventEmitter<boolean>

  public clickOutside() {
    this.outside.emit();
  }

  public confirm(event: boolean): void {
    this.confirmOut.emit(event);
  }

}
