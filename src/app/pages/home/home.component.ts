import { Component } from '@angular/core';
import { YearSvgComponent } from '../../components/year-svg/year-svg.component';
import { auth, dateNewYearActive, now } from '../../guards/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [YearSvgComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  public pre2025 = now >= dateNewYearActive && now < '2025.12.10' ? false : true;
  public newYearActive = auth.newYearIn
  public logIn = auth.isLoggedIn
}
