import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SwipeDirective } from '../../directives/swipe.directive';
import { URL, URL_API } from '../../services/auth.service';
import { GalleryService, TPicture } from '../../services/gallery.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ModalEditComponent } from '../../components/modal-edit/modal-edit.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';
import { keys } from '../../../../environment/keys-env';
import { catchError, map, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ReverseDatePipe } from '../../pipes/reverse-date.pipe';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [CommonModule, ReverseDatePipe, ModalComponent, RouterModule, SwipeDirective, SpinnerComponent, ModalEditComponent],
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css'
})

export class PictureComponent implements DoCheck {
  public picture: TPicture | null = null;
  private id = this.getIdParam();
  public URL = URL
  public isEditOpen = false;
  public isDeleteOpen = false;
  public spinnerOn = false;
  public modalText = '';
  public confirm = false;

  private getIdParam(): string {
    return this.route.snapshot.paramMap.get('id') as any as string;
  }

  public next() {
    this.id = this.gallery.next(this.id)!.id;
    this.router.navigate(['picture', this.id]);
  }

  public prev() {
    this.id = this.gallery.prev(this.id)!.id;
    this.router.navigate(['picture', this.id]);
  }

  public editPicture() {
    this.isEditOpen = true;
  }

  public delPicture() {
    this.isDeleteOpen = true
    this.modalText = `Удалить ${this.picture?.title}?`
    this.confirm = true;
  }

  public confirmDel(event: boolean): void {
    if (event) {
        const sessionId = this.storageService.getFromStorage(keys.sessionId)

      this.spinnerOn = true

      this.httpService.deleteHttp(`${URL_API}/image/${this.picture?.id}`, sessionId)
      .pipe(catchError(err => {
        return throwError(() => {
          console.error('Ошибка при удалении:', err);
          alert('Произошла ошибка при удалении изображения');
          return err
        })
      }),
      map(event => {
        if (event instanceof HttpResponse) {
          return event.body;
        }
        return event;
      }))
      .subscribe((res: any) => {
        if (!res.process) {
          this.isDeleteOpen = true;
          this.modalText = "Картина удалена с вервера"
          this.confirm = false;

          this.spinnerOn = false;
          setTimeout(() => {
            this.isDeleteOpen = false;
            this.router.navigate(['/gallery'])
          }, 1500)
        }
      })

      // this.next();

    } else {
      this.isDeleteOpen = false;
    }
  }

  ngDoCheck(): void {
    this.id = this.getIdParam();
    this.picture = this.gallery.getById(this.id);
  }

  constructor(
    private gallery: GalleryService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,

  ) {
      this.picture = this.gallery.getById(this.id)
  }
}
