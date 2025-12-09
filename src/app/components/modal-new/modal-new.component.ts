import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-new',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, ReactiveFormsModule],
  templateUrl: './modal-new.component.html',
  styleUrl: './modal-new.component.css'
})
export class ModalNewComponent {
  @Input() public info!: string;
  @Input() public error: boolean = false;
  @Input() public top: number = 0;
  @Input() public out: boolean = false;
  @Output() public outside = new EventEmitter<void>
  @Output() public inputValue = new EventEmitter<string>

  public clickOutside() {
    this.outside.emit();
  }

  public setValue(event: string): void {
    this.inputValue.emit(event);
  }

}
