import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { GalleryCardComponent } from "../../components/gallery-card/gallery-card.component";
import { SelectComponent } from '../../components/select/select.component';
import { GalleryService, TPicture } from '../../services/gallery.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    GalleryCardComponent,
    SelectComponent,
    RouterModule,
    SpinnerComponent,
    ImageUploadComponent
],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  public galleryData$: Observable<TPicture[] | null> = this.galleryService.galleryState$;
  public albumValue = this.galleryService.albumValue;
  public albumValue$ = this.galleryService.albumValue;
  public albums$: Subject<string[]> = this.galleryService.albums$;
  public isUpload = false;

  public checkedAlbum(event: string | null) {
    if (event) {
      this.galleryService.filterAlbums(event);
    }
  }

  public openUpload() {
    this.isUpload = true;
  }

  public closeUpload() {
    this.isUpload = false;
  }

  constructor(
    private galleryService: GalleryService,
    private route: ActivatedRoute,
  ) {
    const queryParams: {[key: string]: string} = this.route.snapshot.queryParams;

    if (Object.keys(queryParams).length) {
      for (const key in queryParams) {
        switch(key) {
          case 'album': {
            this.albumValue = galleryService.albumValue = queryParams[key];
            galleryService.filterAlbums(this.albumValue);
          }; break;
        }
      }
      return
    }
    this.galleryService.sortGallery()
  }
}
