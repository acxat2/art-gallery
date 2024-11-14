import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  public title = '';

  constructor( private route: ActivatedRoute ) {
    this.title = this.route.snapshot.data['title']
  }
}
