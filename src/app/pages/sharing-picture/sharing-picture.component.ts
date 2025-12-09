import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SwipeDirective } from '../../directives/swipe.directive';
import { URL, URL_API } from '../../services/auth.service';
import { GalleryService, TPicture } from '../../services/gallery.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { AnotherService } from '../../services/another.service';
import { SharingService } from '../../services/sharing.service';
import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';
import { keys } from '../../../../environment/keys-env';
import { catchError, throwError } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-sharing-picture',
  standalone: true,
  imports: [CommonModule, RouterModule, SwipeDirective, SpinnerComponent, ModalComponent],
  templateUrl: './sharing-picture.component.html',
  styleUrl: './sharing-picture.component.css'
})
export class SharingPictureComponent {
  public picture: TPicture | null = null;
  private id = this.getIdParam();
  public URL = URL
  public spinnerOn = false;
  public isSaved = false;

  private getIdParam(): string {
    return this.route.snapshot.paramMap.get('id') as any as string;
  }

  public next() {
    this.id = this.sharingGallery.next(this.id)!.id;
    this.router.navigate(['sharing/picture', this.id]);
  }

  public prev() {
    this.id = this.sharingGallery.prev(this.id)!.id;
    this.router.navigate(['sharing/picture', this.id]);
  }

  public published() {
    const sessionId = this.storageService.getFromStorage(keys.sessionId)
    if (!sessionId) {
      alert('Войдите в свой профиль для продолжения');
      return;
    }

    this.spinnerOn = true;
    const response = this.httpService.getHttp(`${URL_API}/image/publish/${this.picture?.id}`, sessionId)
    .pipe(catchError(err => {
      return throwError(() => {
        console.error('Ошибка при загрузке:', err);
        alert('Произошла ошибка при загрузке данных');
        return err
      })
    }))
    .subscribe((res: any) => {
      if (res.process) {
        console.log(res.process)
      }
      this.isSaved = true;
      setTimeout(() => {
        this.spinnerOn = false;
        document.location.reload()
      }, 1500)

    })
    setTimeout(() => response.unsubscribe(), 30000)
  }

  public unPublished() {
    const sessionId = this.storageService.getFromStorage(keys.sessionId)
    if (!sessionId) {
      alert('Войдите в свой профиль для продолжения');
      return;
    }

    this.spinnerOn = true;
    const response = this.httpService.getHttp(`${URL_API}/image/unpublish/${this.picture?.id}`, sessionId)
    .pipe(catchError(err => {
      return throwError(() => {
        console.error('Ошибка при загрузке:', err);
        alert('Произошла ошибка при загрузке данных');
        return err
      })
    }))
    .subscribe((res: any) => {
      if (res.process) {
        console.log(res.process)
      }
      this.isSaved = true;
      setTimeout(() => {
        this.spinnerOn = false;
        // this.closed.emit();
        document.location.reload()
      }, 1500)

    })
    setTimeout(() => response.unsubscribe(), 30000)
  }

  ngDoCheck(): void {
    this.id = this.getIdParam();
    this.picture = this.sharingGallery.getById(this.id);
  }

  constructor(
    private sharingGallery: SharingService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private storageService: StorageService
  ) {
      this.picture = this.sharingGallery.getById(this.id)
  }
}
