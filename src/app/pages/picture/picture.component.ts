import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IPicture } from '../../../base/gallery';
import { GalleryService } from '../../services/gallery.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SwipeDirective } from '../../directives/swipe.directive';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterModule, SwipeDirective],
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css'
})

export class PictureComponent implements DoCheck {
  public picture!: IPicture;
  private id = this.getIdParam();

  private getIdParam(): number {
    return this.route.snapshot.paramMap.get('id') as any as number;
  }

  public next() {
    this.id = this.gallery.next(+this.id).id;
    this.router.navigate(['picture', this.id]);
  }

  public next1() {
    console.log('next')
  }

  public prev1() {
    console.log('prev')
  }

  public prev() {
    this.id = this.gallery.prev(+this.id).id;
    this.router.navigate(['picture', this.id]);
  }

  ngDoCheck(): void {
    this.id = this.getIdParam();
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
