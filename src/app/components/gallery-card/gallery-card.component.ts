import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { URL } from '../../services/auth.service';
import { TPicture } from '../../services/gallery.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-gallery-card',
  standalone: true,
  imports: [RouterModule, TooltipDirective, SlicePipe],
  templateUrl: './gallery-card.component.html',
  styleUrl: './gallery-card.component.css'
})
export class GalleryCardComponent {
  @Input() public picture!: TPicture;
  @Input() public link!: string;
  public URL = URL
}
