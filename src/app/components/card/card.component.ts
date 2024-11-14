import { Component, Input, OnInit } from '@angular/core';
import { IPicture } from '../../../base/gallery';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() public picture!: IPicture
  public event = '';

  ngOnInit(): void {
    if (this.picture.event) {
      switch(this.picture.event) {
        case 'birthday': this.event = 'День рождения'; break;
        case 'artSchool': this.event = 'Художка'; break;
        case 'holiday': this.event = 'Праздник';
      }
    } else {
      this.event = 'Не определено'
    }
  }
}
