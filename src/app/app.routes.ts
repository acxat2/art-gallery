import { Routes } from '@angular/router';
import { loggedGuard } from './guards/logged.guard';
import { newYearGuard } from './guards/new-year.guard';
import { AnotherPictureComponent } from './pages/another-picture/another-picture.component';
import { AnotherComponent } from './pages/another/another.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { ImageUploadComponent } from './pages/image-upload/image-upload.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PictureComponent } from './pages/picture/picture.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SharingPictureComponent } from './pages/sharing-picture/sharing-picture.component';
import { SharingComponent } from './pages/sharing/sharing.component';
import { AnotherNewPictureComponent } from './pages/another-new-picture/another-new-picture.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      title: 'Домашняя страница'
    }
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: {
      title: 'Галерея рисунков'
    }
  },
  {
    path: 'another',
    component: AnotherComponent,
    data: {
      title: 'Творчество пользователей'
    }
  },
  {
    path: 'sharing',
    component: SharingComponent,
    data: {
      title: 'Заявки на публикацию'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'image-upload',
    component: ImageUploadComponent,
    // canActivate: [loggedGuard],
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
    path: 'another/picture/:userId/:album/:id',
    component: AnotherPictureComponent
  },

  {
    path: 'another/picture/new/:id',
    component: AnotherNewPictureComponent
  },

  {
    path: 'sharing/picture/:id',
    component: SharingPictureComponent
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
