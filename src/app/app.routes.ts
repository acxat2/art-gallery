import { Routes } from '@angular/router';
import { questGuard } from './guards/quest.guard';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PictureComponent } from './pages/picture/picture.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { QuestComponent } from './pages/quest/quest.component';
import { MusicComponent } from './pages/music/music.component';
import { loggedGuard } from './guards/logged.guard';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { LiteratureComponent } from './pages/literature/literature.component';
import { newYearGuard } from './guards/new-year.guard';
import { NewYearComponent } from './pages/new-year/new-year.component';
import { RegistrationComponent } from './pages/registration/registration.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'gallery',
    pathMatch: 'full'
  },
  {
    path: 'gallery',
    pathMatch: 'full',
    component: GalleryComponent,
    data: {
      title: 'Галерея рисунков'
    }
  },
  {
    path: 'music',
    component: MusicComponent,
    canActivate: [loggedGuard],
    data: {
      title: 'Игра на фортепиано'
    }
  },
  {
    path: 'newyear',
    component: NewYearComponent,
    canActivate: [newYearGuard],
    data: {
      title: 'С Новым 2025 Годом!!!'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  // {
  //   path: 'calendar',
  //   component: CalendarComponent,
  // },
  {
    path: 'literature',
    component: LiteratureComponent,
    canActivate: [loggedGuard],
  },
  {
    path: 'quest',
    component: QuestComponent,
    canActivate: [questGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'picture/:id',
    component:PictureComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];
