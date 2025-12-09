import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input() public selectArr: string[] = [];
  @Input() public selectArrObj: {id: string, username: string}[] = [];
  @Input() public selectName = 'name';
  @Input() public selectControl: string | undefined;

  @Output() public checked = new EventEmitter<string>()

  public checkSelect() {
    this.checked.emit(this.selectControl)
  }
}
