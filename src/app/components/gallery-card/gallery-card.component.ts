import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IPicture } from '../../../base/gallery';

@Component({
  selector: 'app-gallery-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gallery-card.component.html',
  styleUrl: './gallery-card.component.css'
})
export class GalleryCardComponent {
  @Input() public picture!: IPicture

}
