import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { SwipeDirective } from '../../directives/swipe.directive';
import { AnotherService, TAnotherPicture } from '../../services/another.service';
import { URL } from '../../services/auth.service';
import { ReverseDatePipe } from '../../pipes/reverse-date.pipe';

@Component({
  selector: 'app-new-another-picture',
  standalone: true,
  imports: [CommonModule, RouterModule, SwipeDirective, SpinnerComponent, ReverseDatePipe],
  templateUrl: './another-new-picture.component.html',
  styleUrl: './another-new-picture.component.css'
})
export class AnotherNewPictureComponent {
  private id = this.getIdParam();
  private userId = this.getUserIdParam();
  private album = this.getAlbumParam();
  public picture: TAnotherPicture | null = null;
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
    this.id = this.anotherGallery.newNext(this.id)!.id;
    this.router.navigate([`another/picture/new`, this.id]);
  }

  public prev() {
    this.id = this.anotherGallery.newPrev(this.id)!.id;
    this.router.navigate([`another/picture/new`, this.id]);
  }

  ngDoCheck(): void {
    this.id = this.getIdParam();
    this.picture = this.anotherGallery.getNewPictureById(this.id);
  }

  constructor(
    private anotherGallery: AnotherService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.userId && (this.album ? this.album : 'Все')) {
      anotherGallery.getPictureByParams(this.userId, this.album);
    }
  }
}
