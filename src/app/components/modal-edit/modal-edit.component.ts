import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { keys } from '../../../../environment/keys-env';
import { ModalNewComponent } from '../../components/modal-new/modal-new.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { checkDateFromMonth, clineReverseDate, formateInsertDate } from '../../helpers/date-format';
import { URL_API } from '../../services/auth.service';
import { GalleryService, TPicture } from '../../services/gallery.service';
import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';
import { TelegramService } from '../../services/telegram.service';
import { SpinnerComponent } from '../spinner/spinner.component';
@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, CommonModule, ModalNewComponent, ModalComponent],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.css'
})
export class ModalEditComponent implements OnInit {
@Input() imageData!: TPicture; // { id, title, description, year, album, url }
  @Output() public closed = new EventEmitter<void>

  onCloseUpload(): void {
    this.closed.emit();
  }

  public imageForm: FormGroup;
  public uploadedImageUrl: string | null = null;
  public uploadedCardUrl: string | null = null;

  private STORAGE_KEY = keys.sessionId
  private createNew = 'Создать новый';
  private albumsSubject$ = this.galleryService.albums$

  public spinnerOn = false;
  public newOpen = false;
  public isSaved = false;
  public isDuplicate = false;
  public modalText = '';
  public albums$: Observable<string[]> = this.albumsSubject$.asObservable().pipe(
    map((n: string[]) => {
      const newList: string[] = n.map(item => item ==='Все' ? this.createNew : item)
      return newList
    }),
  )

  public selectedFileName: string | null = null;


  public selectOption(event: Event) {
    const selectValue = (event.target as HTMLSelectElement).value
    if (selectValue === this.createNew) {
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

  public openCloseModal(time = 2000) {
    this.isDuplicate = false;
    this.isDuplicate = true;
    setTimeout(() => this.isDuplicate = false, time)
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

  ngOnInit(): void {
    this.imageForm.patchValue({title: this.imageData.title || ''})
    this.imageForm.patchValue({description: this.imageData.description || ''})
    this.imageForm.patchValue({year: formateInsertDate(this.imageData.year) || ''})
    this.imageForm.patchValue({mod: this.imageData.mod})
    this.imageForm.patchValue({sharing: this.imageData.sharing})
    this.imageForm.patchValue({album: this.imageData.album || ''})
  }

  public editImage(): void {
    if (!this.imageForm.valid) return;

    const sessionId = this.storageService.getFromStorage(this.STORAGE_KEY)
    if (!sessionId) {
      alert('Войдите в свой профиль для продолжения');
      return;
    }

    if (this.imageForm.value.title === this.imageData.title
      && this.imageForm.value.description === this.imageData.description
      && clineReverseDate(this.imageForm.value.year) === this.imageData.year
      && this.imageForm.value.album === this.imageData.album
      && this.imageForm.value.sharing === this.imageData.sharing
    ) {
      this.modalText = `Данные не менялись`;
      this.openCloseModal()
      return
    }

    const formData = new FormData();
    formData.append('title', this.imageForm.value.title);
    formData.append('description', this.imageForm.value.description);
    formData.append('year', clineReverseDate(this.imageForm.value.year));
    formData.append('mod', this.imageForm.value.mod !== this.imageData.mod ? this.imageForm.value.mod : this.imageData.mod);
    formData.append('sharing', this.imageForm.value.sharing !== this.imageData.sharing ? this.imageForm.value.sharing : this.imageData.sharing);
    formData.append('album', this.imageForm.value.album);
    formData.append('id', this.imageData.id)

    if (this.imageForm.value.sharing !== this.imageData.sharing) {
      this.modalText = `Картина отправлена на модерацию`;
      this.openCloseModal()

      this.telegramService.publicImage(`Заявка на публикацию`);
    }

    this.spinnerOn = true;
    const response = this.httpService.putHttp(`${URL_API}/image/edit`, formData, sessionId)
    .pipe(catchError(err => {
      return throwError(() => {
        console.error('Ошибка при загрузке:', err);
        alert('Произошла ошибка при загрузке данных');
        return err
      })
    }),
    )
    .subscribe((res: any) => {
      this.isSaved = true;
      setTimeout(() => {
        this.spinnerOn = false;
        document.location.reload()
      }, 1500)

    })
    setTimeout(() => response.unsubscribe(), 30000)
  }

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private storageService: StorageService,
    private galleryService: GalleryService,
    private telegramService: TelegramService
  ) {
    this.imageForm = this.fb.group({
      title: ['', [Validators.maxLength(50), Validators.required]],
      description: ['', [Validators.maxLength(500), Validators.required]],
      year: ['', Validators.max(+(new Date(Date.now()).getFullYear()))],
      mod: [''],
      sharing: [''],
      album: ['', Validators.required]
    });
  }
}
