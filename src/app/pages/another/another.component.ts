import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { GalleryCardComponent } from "../../components/gallery-card/gallery-card.component";
import { SelectComponent } from '../../components/select/select.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { AnotherService, TAnotherPicture, TAnotherUser } from '../../services/another.service';
import { TPicture } from '../../services/gallery.service';
import { AnotherCardComponent } from '../../components/another-card/another-card.component';

@Component({
  selector: 'app-another',
  standalone: true,
  imports: [
    CommonModule,
    AnotherCardComponent,
    SelectComponent,
    RouterModule,
    SpinnerComponent
],
  templateUrl: './another.component.html',
  styleUrl: './another.component.css'
})
export class AnotherComponent {
  public galleryData$: Observable<TAnotherPicture[] | null> = this.anotherService.anotherGalleryState$;
  public newPublic$: Observable<TAnotherPicture[] | null> = this.anotherService.newPublic$;
  public albumValue = this.anotherService.albumValue;
  public userId = this.anotherService.user?.id;

  public albums$: Subject<string[]> = this.anotherService.albums$;
  public users$: Subject<TAnotherUser[]> = this.anotherService.userList$;
  public load$ = this.anotherService.load$;



  public checkedAlbum(event: string) {
    this.albumValue = event;
    this.anotherService.filterAlbums(event);
  }

  public checkedUser(event: string) {
    this.albumValue = 'Все'
    this.userId = event;
    this.anotherService.filterUsers(event);
  }

  constructor(
    private route: ActivatedRoute,
    private anotherService: AnotherService
  ) {
    const queryParams: {[key: string]: string} = this.route.snapshot.queryParams;

    if (Object.keys(queryParams).length) {
      for(let key in queryParams) {
        switch(key) {
          case 'user': this.userId = queryParams[key]; break;
          case 'album': this.albumValue = queryParams[key]; break;
        }
      }
      anotherService.getPicturesByParams(queryParams);
      return
    }

    if (this.albumValue && this.userId) {
      anotherService.filterAlbums(this.albumValue)
      return
    }
    this.anotherService.sortGallery()
  }

}
