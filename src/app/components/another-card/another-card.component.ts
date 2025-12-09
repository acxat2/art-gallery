import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TAnotherPicture } from '../../services/another.service';
import { URL } from '../../services/auth.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-another-card',
  standalone: true,
  imports: [RouterModule, SlicePipe],
  templateUrl: './another-card.component.html',
  styleUrl: './another-card.component.css'
})
export class AnotherCardComponent {
  @Input() public picture!: TAnotherPicture;
  @Input() public link!: string;
  public URL = URL
}
