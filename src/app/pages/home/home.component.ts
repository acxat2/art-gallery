import { Component } from '@angular/core';
import { YearSvgComponent } from '../../components/year-svg/year-svg.component';
import { auth, dateNewYearActive, now } from '../../guards/auth';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Year2025SvgComponent } from '../../components/year-2025/year-svg.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [YearSvgComponent, Year2025SvgComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  public pre2025 = auth.preNewYear;
  public newYearActive = auth.newYearIn
  // public logIn = auth.isLoggedIn
  public logIn$ = this.authService.isAuth$.asObservable()

  constructor (private authService: AuthService) {}
}
