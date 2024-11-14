import { Routes } from '@angular/router';
import { questGuard } from './guards/quest.guard';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PictureComponent } from './pages/picture/picture.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { QuestComponent } from './pages/quest/quest.component';
import { CalendarComponent } from './pages/calendar/calendar.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'gallery',
    pathMatch: 'full'
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: {
      title: 'Галерея рисунков'
    }
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    data: {
      title: 'Органайзер/календарь'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      title: 'Мои проекты'
    }
  },
  {
    path: 'contacts',
    component:ContactsComponent
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
