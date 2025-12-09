import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { keys } from '../../../../environment/keys-env';
import { ModalNewComponent } from '../../components/modal-new/modal-new.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { URL, URL_API } from '../../services/auth.service';
import { GalleryService } from '../../services/gallery.service';
import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { checkDateFromMonth, clineReverseDate } from '../../helpers/date-format';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ModalNewComponent, ModalComponent, TooltipDirective],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})

export class ImageUploadComponent {
  @Output() public closed = new EventEmitter<void>
  public waiting = false;

  onCloseUpload(): void {
    this.closed.emit();
  }

  public imageForm: FormGroup;
  public selectedFile: File | null = null;
  public uploadedImageUrl: string | null = null;
  public uploadedCardUrl: string | null = null;

  private STORAGE_KEY = keys.sessionId;
  private newAlbum = 'Создать новый';
  private albumsSubject$ = this.galleryService.albums$

  public newOpen = false;
  public isDuplicate = false;
  public modalText = '';
  public albums$: Observable<string[]> = this.albumsSubject$.asObservable().pipe(
    map((n: string[]) => {
      const newList: string[] = n.map(item => item ==='Все' ? this.newAlbum : item)
      return newList
    }),
  )

  public selectedFileName: string | null = null;
  public selectOption(event: Event) {
    const selectValue = (event.target as HTMLSelectElement).value
    if (selectValue === this.newAlbum) {
      this.imageForm.patchValue({album: ''});
      this.newOpen = true;
    }
  }

  public addAlbum(album: string) {
    const currentAlbums = this.albumsSubject$.getValue()
    if (album.trim() === '') {
      this.imageForm.patchValue({album})
      this.modalText = 'Не введено название альбома';
      this.openCloseModal()
      return
    }
    if (currentAlbums.includes(album)) {
      this.modalText = `Альбом "${album}" уже существует`;
      this.imageForm.patchValue({album});
      this.openCloseModal()
      return
    }

    const uploadAlbums = [...currentAlbums, album];
    this.albumsSubject$.next(uploadAlbums);
    this.imageForm.patchValue({album});
    this.closeNewModal();
  }

  public closeNewModal() {
    this.newOpen = false;
  }

  public openCloseModal() {
    this.isDuplicate = true;
    setTimeout(() => this.isDuplicate = false, 3000)
  }

  public onInput(e: Event) {
    const input = (e.target as HTMLInputElement).value.replace(/[^\d ]/g, '');
    let formatted = input;

    if (input.length > 2) {
      formatted = input.slice(0, 2) + '.'  + (input.slice(2, 4) <= '12'  ? input.slice(2, 4) :
      ('12'))
      if (input.length === 4) {
        formatted = checkDateFromMonth(formatted)
      }
    };
    if (input.length > 4) formatted = formatted.slice(0, 5)
      + '.'
    + (+input.slice(4, 8) <= new Date(Date.now()).getFullYear() && !input.slice(4).includes(' ') && !input.slice(4, 5).includes(`0`) ? input.slice(4, 8) : new Date(Date.now()).getFullYear());

    this.imageForm.get('year')?.setValue(formatted, {emitEvent: false})
  }

  public onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {

      this.selectedFile = target.files[0];

      this.imageForm.patchValue({image: this.selectedFile});
      this.imageForm.patchValue(!this.imageForm.value.title ? {title: this.selectedFile.name.replace(/\.[^.]+$/, '')} : {title: this.imageForm.value.title})
      this.imageForm.patchValue(!this.imageForm.value.description ? {description: this.selectedFile.name.replace(/\.[^.]+$/, '')} : {description: this.imageForm.value.description})
      this.imageForm.patchValue(this.imageForm.value.year ? {year: this.imageForm.value.year} : {year: '  .  .' + new Date(Date.now()).getFullYear()})
      if (this.selectedFile.size > 1024*3000) {
        this.imageForm.patchValue({title: '', description: ''})
        this.modalText = 'Размер файла не должен превышать 3 Mb.';
        this.openCloseModal()
      }
    } else {
      this.selectedFileName = null;
    }
  }

  public uploadImage(): void {
    if (!this.imageForm.valid || !this.selectedFile) return;

    const sessionId = this.storageService.getFromStorage(this.STORAGE_KEY)
    if (!sessionId) {
      alert('Войдите в свой профиль для продолжения');
      return;
    }

    if (this.selectedFile.size > 1024*3000) {
      this.modalText = 'Размер файла не должен превышать 3 Mb.';
      this.imageForm.patchValue({image: ''});
      this.openCloseModal()
      return
    }

    this.waiting = true;

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('title', this.imageForm.value.title);
    formData.append('description', this.imageForm.value.description);
    formData.append('year', clineReverseDate(this.imageForm.value.year));
    formData.append('album', this.imageForm.value.album);
    formData.append('filename', this.selectedFile.name)

    const response = this.httpService.postHttp(`${URL_API}/image/upload`, formData, sessionId)
    .pipe(catchError(err => {
      return throwError(() => {
        console.error('Ошибка при загрузке:', err);
        alert('Произошла ошибка при загрузке изображения');
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
        this.waiting = false;

        this.galleryService.sortGallery()
        this.imageForm.patchValue({description: '', year: '', title: ''})
        this.uploadedCardUrl = `${URL}/cards/${res.filename}`;
      }
      response.unsubscribe()
    })
  }

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private storageService: StorageService,
    private galleryService: GalleryService
  ) {
    this.imageForm = this.fb.group({
      image: ['', [Validators.required]],
      title: ['', [Validators.maxLength(50), Validators.required]],
      description: ['', [Validators.maxLength(200), Validators.required]],
      year: ['', Validators.minLength(10)],
      album: ['', Validators.required]
    });
  }
}
