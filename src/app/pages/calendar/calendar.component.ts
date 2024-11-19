import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarSelectorComponent } from "./components/calendar-selector/calendar-selector.component";
import { CalendarBodyComponent } from "./components/calendar-body/calendar-body.component";
import { CalendarOrganizerComponent } from "./components/calendar-organizer/calendar-organizer.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarSelectorComponent, CalendarBodyComponent, CalendarOrganizerComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  public title = '';

  constructor( private route: ActivatedRoute ) {
    this.title = this.route.snapshot.data['title']
  }
}
