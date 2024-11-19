import { Component, Input } from '@angular/core';
import { IPicture } from '../../../../base/gallery';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-p-gallery',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './p-gallery.component.html',
  styleUrl: './p-gallery.component.css'
})
export class PGalleryComponent {
  @Input() public images: IPicture[] = [];

  displayCustom: boolean = false;

    activeIndex: number = 0;

    responsiveOptions: any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor() {}

    // ngOnInit() {
    //     this.photoService.getImages().then((images) => (this.images = images));
    // }

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }
}
