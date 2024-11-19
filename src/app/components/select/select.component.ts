import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translate.pipe';


@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input() public selectArr: string[] = [];
  @Input() public selectName = 'name';
  @Input() public selectControl = '';

  @Output() public checked = new EventEmitter<string>()

  public checkSelect() {
    this.checked.emit(this.selectControl)
  }
}
