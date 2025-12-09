import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AnotherCardComponent } from '../../components/another-card/another-card.component';
import { SelectComponent } from '../../components/select/select.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { TPicture } from '../../services/gallery.service';
import { SharingService, TAnotherUser } from '../../services/sharing.service';

@Component({
  selector: 'app-sharing',
  standalone: true,
  imports: [
    CommonModule,
    AnotherCardComponent,
    SelectComponent,
    RouterModule,
    SpinnerComponent
],
  templateUrl: './sharing.component.html',
  styleUrl: './sharing.component.css'
})
export class SharingComponent {
 public galleryData$: Observable<TPicture[] | null> = this.sharingService.anotherGalleryState$;
  public albumValue = this.sharingService.albumValue;
  public userId = this.sharingService.user?.id;

  public albums$: Subject<string[]> = this.sharingService.albums$;
  public users$: Subject<TAnotherUser[]> = this.sharingService.userList$;
  public load$ = this.sharingService.load$;

  public checkedAlbum(event: string) {
    this.albumValue = event;
    this.sharingService.filterAlbums(event);
  }

  public checkedUser(event: string) {
    this.albumValue = 'Все'
    this.userId = event;
    this.sharingService.filterUsers(event);
  }

  constructor(
    private route: ActivatedRoute,
    private sharingService: SharingService
  ) {
    const queryParams: {[key: string]: string} = this.route.snapshot.queryParams;

    if (Object.keys(queryParams).length) {
      for(let key in queryParams) {
        switch(key) {
          case 'user': this.userId = queryParams[key]; break;
          case 'album': this.albumValue = queryParams[key]; break;
        }
      }
      sharingService.getPicturesByParams(queryParams);
      return
    }

    if (this.albumValue && this.userId) {
      sharingService.filterAlbums(this.albumValue)
      return
    }
    this.sharingService.sortGallery()
  }

}
