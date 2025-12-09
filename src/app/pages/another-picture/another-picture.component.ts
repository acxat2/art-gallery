import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SwipeDirective } from '../../directives/swipe.directive';
import { URL } from '../../services/auth.service';
import { GalleryService, TPicture } from '../../services/gallery.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { AnotherService, TAnotherPicture } from '../../services/another.service';
import { ReverseDatePipe } from '../../pipes/reverse-date.pipe';

@Component({
  selector: 'app-another-picture',
  standalone: true,
  imports: [CommonModule, RouterModule, SwipeDirective, SpinnerComponent, ReverseDatePipe],
  templateUrl: './another-picture.component.html',
  styleUrl: './another-picture.component.css'
})
export class AnotherPictureComponent {
  public picture: TAnotherPicture | null = null;
  private id = this.getIdParam();
  private userId = this.getUserIdParam();
  private album = this.getAlbumParam();
  public URL = URL

  private getIdParam(): string {
    return this.route.snapshot.paramMap.get('id') as string;
  }

  private getAlbumParam(): string {
    return this.route.snapshot.paramMap.get('album') as string;
  }

  private getUserIdParam(): string {
    return this.route.snapshot.paramMap.get('userId') as string;
  }

  public next() {
    this.id = this.anotherGallery.next(this.id)!.id;
    this.router.navigate([`another/picture/${this.userId}/${this.album}`, this.id]);
  }

  public prev() {
    this.id = this.anotherGallery.prev(this.id)!.id;
    this.router.navigate([`another/picture/${this.userId}/${this.album}`, this.id]);
  }

  ngDoCheck(): void {
    this.id = this.getIdParam();
    this.picture = this.anotherGallery.getById(this.id);
  }

  constructor(
    private anotherGallery: AnotherService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const picture = this.anotherGallery.getById(this.id)
    if (picture) {
      this.picture = picture
      return
    }

    anotherGallery.getPictureByParams(this.userId, this.album);
  }

}
