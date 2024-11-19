import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-calendar-body',
  standalone: true,
  imports: [CalendarModule],
  templateUrl: './calendar-body.component.html',
  styleUrl: './calendar-body.component.css'
})
export class CalendarBodyComponent {

}
