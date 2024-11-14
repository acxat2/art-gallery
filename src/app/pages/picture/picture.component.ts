import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPicture } from '../../../base/gallery';
import { GalleryService } from '../../services/gallery.service';
import { EventsPipe } from '../../pipes/events.pipe';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [CommonModule, EventsPipe],
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css'
})

export class PictureComponent implements DoCheck {
  public picture!: IPicture;
  private id = this.route.snapshot.paramMap.get('id') as any as number;

  public next() {
    this.id = this.gallery.next(+this.id).id;
    this.router.navigate(['picture', this.id]);
  }

  public prev() {
    this.id = this.gallery.prev(+this.id).id;
    this.router.navigate(['picture', this.id]);
  }

  ngDoCheck(): void {
    this.picture = this.gallery.getById(+this.id);
  }

  constructor(
    private gallery: GalleryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.picture = this.gallery.getById(+this.id)
  }
}
