import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Holiday, IPicture, ToWhom } from '../../../base/gallery';
import { GalleryCardComponent } from "../../components/gallery-card/gallery-card.component";
import { SelectComponent } from '../../components/select/select.component';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    GalleryCardComponent,
    SelectComponent,
],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  public galleryData$: Observable<IPicture[]> = this.galleryService.galleryState$

  public events = [
    'Все',
    Holiday.holiday,
    Holiday.birthday,
    Holiday.artSchool
  ]

  public toWhom = [
    'Все',
    ToWhom.mother,
    ToWhom.father,
    ToWhom.brother,
    ToWhom.grandmother,
    ToWhom.lelya,
    ToWhom.another,
  ]

  public author = [
    'Все',
    'Алина',
    'Даниил',
    'Папа',
  ]

  public eventValue = 'Все'
  public toWhomValue = 'Все'
  public authorValue = 'Все'

  public checkedEvent(event: string) {
    this.galleryService.filterEvents(event)
  }

  public checkedToWhom(event: string) {
    this.galleryService.filterToWhom(event)
  }

  public checkedAuthor(event: string) {
    this.galleryService.filterAuthor(event)
  }

  constructor(
    private galleryService: GalleryService,
    private router: Router
  ) {
    const queryParams: {event?: string, toWhom?: string, author?: string} = {};

    if (this.galleryService.authorValue) {
      queryParams.author = this.galleryService.authorValue
      this.authorValue = this.galleryService.authorValue
    }
    if (galleryService.eventValue) {
      queryParams.event = this.galleryService.eventValue
      this.eventValue = this.galleryService.eventValue
    }
    if (galleryService.toWhomValue) {
      queryParams.toWhom = this.galleryService.toWhomValue
      this.toWhomValue = this.galleryService.toWhomValue
    }
    this.router.navigate([], {queryParams})
  }
}

